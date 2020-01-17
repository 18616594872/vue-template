import Vue from 'vue'

export default () => {
    let config =
        process.env.NODE_ENV === 'production' ?
        '' //生产环境
        :
        require('../../public/serverconfig.json') //开发环境

    // 设置日志的显示 
    Vue.prototype.Log.setParam(config.LogConfig.open, config.LogConfig.level)

    // 设置ECharts主题 
    Vue.prototype.EChartsTheme = process.env.NODE_ENV === 'production' ?
        '' //生产环境
        :
        require('../../public/eChartsTheme/' + config.EChartsTheme + '.project.json').theme //开发环境
}