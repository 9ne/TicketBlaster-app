const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD).replace('<name>', 'Ticket-Blaster');

const init = async () => {
  try {
    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('Database Connected');
  } catch(err) {
    console.log(err);
  }
};

module.exports = {
  init
}
