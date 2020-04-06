import Vue from 'vue'

// 自动递归遍历 module目录下指令 挂在到全局
const modulesFiles = require.context('./module', true, /\.ts$/)

const arr = modulesFiles.keys().map(modulesFiles) 
Array.from(arr).forEach((directive: any) => {
    directive = directive.__esModule && directive.default ? directive.default : directive;
    Object.keys(directive).forEach((key) => Vue.directive(key, directive[key]))
})