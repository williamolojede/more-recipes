/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);
const rootURL = '/api/v1';

// users with id: 1 and 2 would have been seeded into the test db
const tokens = {
  johnToken: jwt.sign({ user: { id: 1 } }, process.env.JWT_SECRET, { expiresIn: '1 hour' }),
  janeToken: jwt.sign({ user: { id: 2 } }, process.env.JWT_SECRET, { expiresIn: '1 hour' }),
};

export default {
  request,
  rootURL,
  expect,
  jwt,
  tokens
};
