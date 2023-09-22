const Ticket = require('../../../pkg/ecommerce/ecommerceSchema');
const TicketHistory = require('../../../pkg/ecommerce/ecommerceSchemaHistory');
const User = require('../../../pkg/user/userSchema');

const addTicket = async (req, res) => {
  try {
    const { user, tickets } = req.body;

    console.log(user);

    const loggedUser = await Ticket.findOne({ user });

    console.log(loggedUser);
 
    if (loggedUser) {

      const newTicketEvents = tickets.map((ticket) => ticket.event);

      const filterTicketEvents = loggedUser.tickets.filter((filteredEvents)=> !newTicketEvents.includes(filteredEvents.event));

      filterTicketEvents.push(...tickets);

      loggedUser.tickets = filterTicketEvents;

      await loggedUser.save();

      console.log('saved logged user:', loggedUser);

      res.status(201).json({
        status: 'Success',
        data: {
          message: 'Tickets have been updated, added to the new tickets'
        }
      });

    } else {
      const newTicket = await Ticket.create({
        user: user,
        tickets: tickets
      });

      console.log('new ticket:', newTicket);

      res.status(201).json({
        status: 'Success',
        tickets: newTicket
      });
    };

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const getTickets = await Ticket.find();

    res.status(200).json({
      status: 'Success',
      data: {
        getTickets
      }
    });

    } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const getTicket = async (req, res) => {
  try {

    const ticket = await Ticket.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: {
        ticket
      }
    });
  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const getTicketsForUser = async (req, res) => {
  try {

    const userId = req.params.userId;
    console.log(userId);

    const ticket = await Ticket.findOne({user: userId })
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

const removeEventfromTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    console.log('ticket ID:', ticketId);
    const eventToRemove = req.params.eventToRemove;
    console.log('event to remove:', eventToRemove);

    const ticket = await Ticket.findById(ticketId);

    if(!ticket) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Ticket not found'
      });
    }

    const eventIndex = ticket.tickets.findIndex((event) => event._id === eventToRemove);

    ticket.tickets.splice(eventIndex, 1);

    await ticket.save();

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
  getAllTickets,
  getTicket,
  removeEventfromTicket,
  getTicketsForUser
}