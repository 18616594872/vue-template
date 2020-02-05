/*
 * @Description: 页面快速生成脚本
 */
const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirParentName = process.argv[2]
const dirSecondParentName = process.argv[3]
const dirName = process.argv[4]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)

if (!dirName) {
    console.log('文件夹名称不能为空！')
    console.log('示例：npm run tep ${capPirName}')
    process.exit(0)
}

/**
 * @msg: vue页面模版
 */
const VueTep = `<template>
  <div class="${dirName}-wrap">
    {{data.componentName}}
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from "vue-property-decorator"
  // import {  } from "@/components" // 组件

  @Component({})
  export default class About extends Vue {
    // prop
    @Prop({
      required: false,
      default: ''
    }) name!: string

    created() {
      //
    }
    
    activated() {
      //
    }

    mounted() {
      //
    }

  }
</script>

<style lang="scss">
  @import "@/assets/scss/variables";

  .${dirName}-wrap {
    width: 100%;
  }
</style>

`

// interface 模版
const interfaceTep = `// ${dirName}.Data 参数类型
export interface ${capPirName}Data {
  componentName: string
}

`


// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
mkdirsSync(`${basePath}/components/${dirParentName}/${dirSecondParentName}/${dirName}`, () => {
    console.log('done');
})

process.chdir(`${basePath}/components/${dirParentName}/${dirSecondParentName}/${dirName}`) // cd dirName
fs.writeFileSync(`${dirName}.vue`, VueTep) // vue 

process.chdir(`${basePath}/api`); // cd api
fs.writeFileSync(`${dirName}.ts`, apiTep) // api

process.exit(0)