const express = require('express');
const auth = require('./handlers/authHandler');
const DB = require('../../pkg/db/index');
const cookieParser = require('cookie-parser');

const api = express();

DB.init();

api.use(express.json());
api.use(cookieParser());

api.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

api.post('/api/v1/create-account', auth.signUp);
api.post('/api/v1/log-in', auth.login);

api.listen(process.env.AUTH_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Authentication service online!');
});