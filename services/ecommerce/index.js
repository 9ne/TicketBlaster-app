const express = require('express');
const cors = require('cors');
const DB = require('../../pkg/db/index');

const api = express();

api.use(cors());

DB.init();

api.use(express.json());
api.use(express.urlencoded({extended: true}));
api.use(express.static('public'));

api.post('/api/v1/ecommerce/add-ticket');
api.get('/api/v1/ecommerce/get-tickets');
api.get('/api/v1/ecommerce/get-ticket/:id');
api.delete('/api/v1/ecommerce/delete-ticket');

api.listen(process.env.ECOMMERCE_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Ecommerce service online!');
});