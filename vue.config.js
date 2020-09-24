module.exports = {
    devServer: {
        open: true,
        port: 8081,
        host: "127.0.0.1",
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