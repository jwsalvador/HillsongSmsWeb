module.exports = function (app) {
  if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const config = require('../../webpack.dev.config.js')
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(config)
    app.use(webpackHotMiddleware(compiler))
    app.use(webpackDevMiddleware(compiler, {
      noInfo: false,
      publicPath: config.output.publicPath
    }));
  }
}