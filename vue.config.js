const path = require('path')
const webpack = require('webpack')

const resolve = dir => {
    return path.join(__dirname, dir)
}


// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
    publicPath: '/',
    outputDir: 'dist', // 打包生成的生产环境构建文件的目录
    assetsDir: 'static', // 放置生成的静态资源路径，默认在outputDir
    indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
    pages: undefined, // 构建多页
    productionSourceMap: false, // 开启 生产环境的 source map?
    chainWebpack: config => {
        // 配置路径别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components'))
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type =>
            addStyleResource(config.module.rule('less').oneOf(type))
        )
    },
    css: {
        modules: false, // 启用 CSS modules
        extract: true, // 是否使用css分离插件
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {} // css预设器配置项
    },
    devServer: {
        port: port, // 端口
        proxy: {
            // change api/login => mock/login
            [process.env.VUE_APP_BASE_API]: {
                target: `http://127.0.0.1:${port}/mock`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        after: require('./mock/mock-server.js')
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: []
        }
    }
}

function addStyleResource(rule) {
    rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                // 需要全局导入的less路径
                path.resolve(__dirname, './src/assets/less/common.less'),
                path.resolve(__dirname, './src/assets/less/variables.less')
            ]
        })
}
