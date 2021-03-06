import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';
import bodyPaser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';

import routes from './routes';


/**
 * environmental variable setup
 */
dotenv.config();

const port = parseInt(process.env.PORT, 10) || 8000;

const app = express();

app.use(cors());

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
app.use('/docs-assets', express.static(path.resolve(__dirname, '..', 'docs')));

// API ROUTES
app.use('/api', routes);


// STATIC FILE FOR REACT FRONTEND
app.use('/static', express.static(path.resolve(__dirname, '..', 'dist/client')));

app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// RENDER REACT FRONTEND
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'client/index.html'));
});

// error handler
// define as the last app.use callback
/* eslint no-unused-vars: 0 */
app.use(({ message, statusCode }, req, res, next) => {
  // defaults to internal server error
  res.status(statusCode || 500);
  res.send({
    message,
    status: 'fail'
  });
});

// http://www.marcusoft.net/2015/10/eaddrinuse-when-watching-tests-with-mocha-and-supertest.html
if (!module.parent) { app.listen(port); }

export default app;
