const proxyDomain = 'https://dev.relictum.finance/'


module.exports = {
  productionSourceMap: false,
  filenameHashing: true,
  css: {
    extract: false,
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    devServer: {
      host: 'localhost',
      watchOptions: {
        poll: true
      },
      proxy: {
        '/ajax': {
          target: proxyDomain,
          changeOrigin: true,
          pathRewrite: {'/ajax' : ''}
        },
      }
    }
  },
};