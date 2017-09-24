import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyPaser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';

import routes from './routes';

const port = parseInt(process.env.PORT, 10) || 8000;

const app = express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true
  }));
  app.use(webpackHotMiddleware(compiler, {
    reload: true // reload page when webpack gets stuck
  }));
}

app.use(logger('dev'));

app.use(bodyPaser.json());

app.use(bodyPaser.urlencoded({ extended: false }));


// API DOCUMENTATION
app.get('/api/docs', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'docs/index.html'));
});

// STATIC FILE FOR API DOCUMENTATION
app.use('/api/docs-assets', express.static(path.resolve(__dirname, '..', 'docs')));

// API ROUTES
app.use('/api', routes);

// STATIC FILE FOR REACT FRONTEND
app.use('/static', express.static(path.resolve(__dirname, '..', 'dist/client')));

// RENDER REACT FRONTEND
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'client/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // defaults to internal server error
  res.status(err.status || 500);
  res.send({ message: err.message, });
});

// http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent) { app.listen(port); }

export default app;
