import express from 'express';
import path from 'path';

const server = express();
const isProd = process.env.NODE_ENV === 'production';
if(!isProd) {
  const webpack = require('webpack');
  const config = require('../../config/webpack.dev');
  const compiler = webpack(config)
  
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  )
  
  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)
  
  server.use(webpackDevMiddleware)
  server.use(webpackHotMiddleware)
  console.log('Middleware enabled')
}

const staticMiddleware = express.static('dist')
server.use(staticMiddleware);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is Listening on http://localhost:${port}`)
});