const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String
  },
  date: {
    type: String
  },
  location : {
    type: String
  },
  category: {
    type: String,
    enum: ['Musical Concert', 'Stand-up Comedy']
  },
  eventDetails: {
    type: String
  },
  image: {
    type: String
  },
  genre: {
    type: String,
    enum: ['rock', 'metal', 'heavy metal', 'dance', 'electronic', 'comedy']
  },
  price: {
    type: String
  }
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;