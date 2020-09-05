var mongoose = require('mongoose');

//for Heroku deployment
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });


const db = mongoose.connection;

module.exports = db