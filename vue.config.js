
module.exports = {
    devServer: {
        open: true,
        port: 9527,
        host: "0.0.0.0",
        hotOnly: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://127.0.0.1:8801',
        //         changeOrigin: true,
        //         secure: false,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
    }
}