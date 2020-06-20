import express from 'express';
import path from 'path';
const server = express();
import React from 'react';
const expressStaticGzip = require('express-static-gzip');
import { renderToString } from 'react-dom/server';

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd
if(isDev) {
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
} else {
  const AppRoot = require("../components/AppRoot").default
  server.use(expressStaticGzip('dist', {
    enableBrotli: true
  }));
  
  server.use('*', (req, res ) => {
    res.send(`
      <html>
        <head>
          <link href="/main.css" rel="stylesheet"/>
        </head>
        <body>
          <div id="react-root">
            ${renderToString(<AppRoot />)}
          </div>
          <script src='/vendor-bundle.js'></script>
          <script src='/main-bundle.js'></script>
        </body>
      </html>
    `)
  })
}

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is Listening on http://localhost:${port} in ${process.env.NODE_ENV}`)
});