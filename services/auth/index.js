const express = require('express');
const auth = require('./handlers/authHandler');
const DB = require('../../pkg/db/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const api = express();
api.use(cors());

DB.init();

api.use(express.json());
api.use(cookieParser());

api.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

api.post('/api/v1/auth/create-account', auth.signUp);
api.post('/api/v1/auth/log-in', auth.login);
api.get('/api/v1/auth/log-out', auth.logOut);

api.listen(process.env.AUTH_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Authentication service online!');
});