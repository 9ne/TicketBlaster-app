const mongoose = require ('mongoose');
const Event = require('../events/eventSchema');

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  tickets: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event'
    }
  ]
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;