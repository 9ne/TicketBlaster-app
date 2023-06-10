const express = require('express');
const eventHandler = require('./eventHandler/eventHandler');
const DB = require('../../pkg/db/index');

const api = express();

DB.init();

api.use(express.json());

api.get('/api/v1/get-all-events', eventHandler.getAllEvents);
api.get('/api/v1/get-one-event/:id', eventHandler.getOneEvent);
api.post('/api/v1/create-event', eventHandler.createEvent);
api.patch('/api/v1/update-event/:id', eventHandler.updateEvent);
api.delete('/api/v1/delete-event/:id', eventHandler.deleteEvent);

api.listen(process.env.EVENT_PORT, (err) => {
  if(err) return console.log(err);
  console.log('Event service online!');
})