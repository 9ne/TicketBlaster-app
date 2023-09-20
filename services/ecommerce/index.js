const express = require('express');
const cors = require('cors');
const DB = require('../../pkg/db/index');
const ecommerce = require('./ecommerceHandler/ecommerceHandler');

const api = express();

api.use(cors());

DB.init();

api.use(express.json());
api.use(express.urlencoded({extended: true}));
api.use(express.static('public'));

api.post('/api/v1/ecommerce/add-ticket', ecommerce.addTicket);
api.get('/api/v1/ecommerce/get-tickets', ecommerce.getAllTickets);
api.get('/api/v1/ecommerce/get-ticket/:userId', ecommerce.getTicket);
api.get('/api/v1/ecommerce/get-tickets-user/:userId', ecommerce.getTicketsForUser);
api.delete('/api/v1/ecommerce/delete-ticket', ecommerce.removeTicket);

api.listen(process.env.ECOMMERCE_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Ecommerce service online!');
});