const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../webpack.dev.config.js')

module.exports = function (app) {
  if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(config)
    app.use(webpackHotMiddleware(compiler))
    app.use(webpackDevMiddleware(compiler, {
      noInfo: false,
      publicPath: config.output.publicPath
    }));
  }
}