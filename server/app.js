const express = require('express');
const logger = require('morgan');
const bodyPaser = require('body-parser');

const app = express();

app.use(logger('dev'));

app.use(bodyPaser.json());

app.use(bodyPaser.urlencoded({ extended: false }));


module.exports = app;
