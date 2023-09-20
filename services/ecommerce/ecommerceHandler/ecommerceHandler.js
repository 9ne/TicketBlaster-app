const Ticket = require('../../../pkg/ecommerce/ecommerceSchema');
const User = require('../../../pkg/user/userSchema');

const addTicket = async (req, res) => {
  try {

    const { user, tickets } = req.body;

    const newTicket = await Ticket.create({
      user: user,
      tickets: tickets
    });

    res.status(201).json({
      status: 'Success',
      data: {
        newTicket: newTicket
      }
    });

  } catch (err) {
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
        path: 'tickets',
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



const removeTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

module.exports = {
  addTicket,
  getAllTickets,
  getTicket,
  removeTicket,
  getTicketsForUser
}