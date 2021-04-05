module.exports = {
    pages: {
        app: {
            entry: 'examples/main.js',
            template: 'examples/index.html',
            filename: 'index.html'
        }
    },
    publicPath: '/',
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.js'
            }
        }
    }
};
