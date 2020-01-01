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
        {{data.pageName}}
    </div>
</template>

<script lang="ts" src="./${dirName}.ts"></script>

<style lang="less">
    @import './${dirName}.less';
</style>

`

// ts 模版
const tsTep = `import { Component, Vue } from 'vue-property-decorator'
// import from "@/components" // 组件
// import {  } from '@/api/${dirName}.ts'

@Component({})
export default class About extends Vue {

    // data
    data: ${capPirName}Data = {
        pageName: '${dirName}'
    }

    mounted() {
        //
    }

    // 初始化函数
    init() {
        //
    }
    
}
`

// less 模版
const lessTep = `
.${dirName}-wrap {
    width: 100%;
}
`

// api 接口模版
const apiTep = `import request from '@/utils/request.ts'

export function test(data: any) {
    return request({
        url: '',
        method: 'post',
        data
    })
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
mkdirsSync(`${basePath}/views/${dirParentName}/${dirSecondParentName}/${dirName}`, () => {
    console.log('done');
})

process.chdir(`${basePath}/views/${dirParentName}/${dirSecondParentName}/${dirName}`) // cd dirName
fs.writeFileSync(`${dirName}.vue`, VueTep) // vue 
fs.writeFileSync(`${dirName}.ts`, tsTep) // ts
fs.writeFileSync(`${dirName}.less`, lessTep) // less

process.chdir(`${basePath}/api`); // cd api
fs.writeFileSync(`${dirName}.ts`, apiTep) // api

process.exit(0)