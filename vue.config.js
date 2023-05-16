const { defineConfig } = require('@vue/cli-service')
module.exports = {
    transpileDependencies: true,
    lintOnSave: false,
    
    productionSourceMap: false, //不输出map文件
    publicPath: "./",
    devServer: {
        proxy: {
            '/api': {
                target: 'https://1e8885b5-dec7-4060-8b59-4afdfcc93db4.mock.pstmn.io',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
                //secure为true,不允许http请求
                // secure: true,
            }
        }
    }
}

