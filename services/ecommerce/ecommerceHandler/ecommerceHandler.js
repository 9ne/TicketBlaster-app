const Cart = require('../../../pkg/ecommerce/ecommerceCart');
const TicketHistory = require('../../../pkg/ecommerce/ecommerceSchemaHistory');

const addTicket = async (req, res) => {
  try {
    const { user, tickets } = req.body;

    console.log('user:', user); 
    console.log('tickets:', tickets);

    const loggedUser = await Cart.findOne({ user });
    // console.log(loggedUser);
 
    if (loggedUser) {

      for (const newTicket of tickets) {
        const existingTicket = loggedUser.tickets.find((cartTicket) => {
          return cartTicket.event._id.toString() === newTicket.event.toString();
          // console.log(typeof cartTicket.event._id);
          // console.log(typeof newTicket.event);
        })
        if (existingTicket) {
          existingTicket.quantity = Number(existingTicket.quantity) + Number(newTicket.quantity);
        } else {
          loggedUser.tickets.push(newTicket);
        }
        // console.log ('existing tickets:', existingTicket);
      };

      await loggedUser.save();

      
      res.status(201).json({
        status: 'Success',
        data: {
          message: 'Tickets have been updated, added to the new tickets',
          tickets
        }
      });

    } else {
      const newCart = await Cart.create({
        user: user,
        tickets: tickets
      });

      res.status(201).json({
        status: 'Success',
        tickets: newCart
      });
    };

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const getTicketsForUser = async (req, res) => {
  try {

    const userId = req.params.userId;
    // console.log(userId);

    const ticket = await Cart.findOne({ user: userId })
      .populate({
        path: 'tickets.event',
        model: 'event',
        select: '-relatedActs'
      });

    res.status(200).json({
      status: 'Success',
      data: {
        ticket
      }
    });

  } catch(err) {
    res.status(500).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const processPaymentAddToHistory = async (req, res) => {
  try {
    const userId = req.body.userId;
    
    let userTicket = await Cart.findOne({ user: userId });

    let ticketsHistory = await TicketHistory.findOne({ user: userId });

    if (!ticketsHistory) {
      ticketsHistory = await TicketHistory.create({ 
        user: userId,
        historyTickets: [],
      });
    };


    ticketsHistory.historyTickets.push(...userTicket.tickets);

    await ticketsHistory.save();

    userTicket.tickets = [];

    await userTicket.save();

    res.status(200).json({
      status: 'Sucess',
      data: {
        ticketsHistory
      }
    });

  } catch(err) {
    res.status(500).json({
      status: 'Fail',
      message: err.message
    });
  }
};
 
const getPurchasedTickets = async (req, res) => {
  try {
    const userId = req.params.userId;

    const purchasedTickets = await TicketHistory.findOne({ user: userId })
      .populate({
        path: 'historyTickets.event',
        model: 'event',
        select: '-relatedActs'
      });

    const systemTime = new Date().getTime();
    const timeWindow = 10 * 1000;
    const toleranceForBying = systemTime - timeWindow;

    // console.log('tolerance for bying:', toleranceForBying);
    // console.log('system time:', systemTime);

    const currPurchasedTickets = purchasedTickets.historyTickets.filter((ticket) => {
      // console.log('ticket timestamp:', ticket.timeStamp);
      return ticket.timeStamp >= toleranceForBying
    });

    // console.log('filtered tickets:', currPurchasedTickets);

    currPurchasedTickets.sort((a, b) => b.timeStamp - a.timeStamp);

    res.status(200).json({
      status: 'Success',
      data: {
        purchasedTickets: currPurchasedTickets
      }
    });

  } catch(err) {
    res.status(500).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const getAllTicketsHistoryOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // console.log(userId);

    const findAllTickets = await TicketHistory.findOne({ user: userId })
      .populate({
        path: 'historyTickets.event',
        model: 'event',
        select: '-relatedActs'
      });

    if (!findAllTickets) {
      return res.status(404).json({
        status: 'Fail',
        message: 'No ticket history found for this user'
      });
    }

    const sortTicketsDate = [...findAllTickets.historyTickets].sort((a, b) => b.timeStamp - a.timeStamp);

    // console.log(sortTicketsDate);

    res.status(200).json({
      status: 'Success',
      data: {
        sortTicketsDate
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    });
  }
};


const removeTicketFromCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    console.log('cart id:', cartId);
    const ticketRemove = req.params.ticketRemove;
    console.log('event to remove:', ticketRemove);

    const cart = await Cart.findById(cartId);

    if(!cart) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Cart not found'
      });
    }

    console.log('current tickets:', cart.tickets);

    cart.tickets = cart.tickets.filter((ticket) => 
      ticket.event._id.toString() !== ticketRemove.toString()
    );

    console.log('updated cart:', cart.tickets);

    await cart.save();

    res.status(204).json({
      status: 'Success',
      data: null
    });
    
  } catch(err) {
    res.status(500).json({
      status: 'Error',
      message: err.message
    });
  }
};

module.exports = {
  addTicket,
  removeTicketFromCart,
  getTicketsForUser,
  getPurchasedTickets,
  processPaymentAddToHistory,
  getAllTicketsHistoryOfUser
}