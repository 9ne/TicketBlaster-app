const express = require('express');
const auth = require('../auth/handlers/authHandler');
const DB = require('../../pkg/db/index');
const cookieParser = require('cookie-parser');

const app = express();

DB.init();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.post('/api/v1/create-account', auth.signUp);
app.post('/api/v1/log-in', auth.login);

app.listen(process.env.PORT1, (err) => {
  if(err) return console.log(err);
  console.log('Service Online!');
});