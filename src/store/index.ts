import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./module', true, /\.ts$/)

// 不需要 `import app from './modules/app'`
// 自动识别模块中的所有vuex模块
const modules = modulesFiles.keys().reduce((modules: any, modulePath: any) => {
  // set './app.ts' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
    getters,
    modules
})
