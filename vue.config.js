// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = 'DApp list' // page title

module.exports = {
  // publicPath: '/',
  publicPath: '/dapp-list/',
  assetsDir: './',
  devServer: {
    open: true,
    port: 9000,
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  /*  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname, 'dist'),
          // outputDir: path.join(__dirname, 'keypal'),
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: ['/zh/', '/zh/blockchain', '/en/', '/en/blockchain'],
          // 这个很重要，如果没有配置这段，也不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: 'bar',
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            // renderAfterDocumentEvent: 'custom-render-trigger'
          }),
        }),
      ],
    }
  }, */
}
