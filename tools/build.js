import webpack from 'webpack';
import config from '../webpack.prod.config.js';

process.env.NODE_ENV = 'production';

webpack(config).run((err, stats) => {
  if (err) {
    console.log(err);
  }

  console.log(`Webpack stats: ${stats}`);

  return 0
});