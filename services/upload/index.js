const express = require('express');
const DB = require('../../pkg/db/index');

const api = express();

DB.init();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static('public'));

api.listen(process.env.MULTER_UPLOAD_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Upload multer service online!');
});


