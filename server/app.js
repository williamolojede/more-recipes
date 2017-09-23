import express from 'express';
import logger from 'morgan';
import bodyPaser from 'body-parser';
import routes from './routes';

const port = parseInt(process.env.PORT, 10) || 8000;

const app = express();

app.use(logger('dev'));

app.use(bodyPaser.json());

app.use(bodyPaser.urlencoded({ extended: false }));

app.use('/api', routes);

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
