const mongoose = require('mongoose');

const ticketHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  historyTickets: [
    {
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
      },
      quantity: {
        type: Number
      }
    }
  ]
});

const TicketsHistory = mongoose.model('ticketHistory', ticketHistorySchema);

module.exports = TicketsHistory;