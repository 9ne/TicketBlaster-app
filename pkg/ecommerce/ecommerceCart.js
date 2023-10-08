const mongoose = require ('mongoose');
const Event = require('../events/eventSchema');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  tickets: [
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

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;