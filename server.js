const express = require('express');
const app = express();
const { PORT } = require('./config/Aap.config.js');
const bodyParser = require('body-parser');
const { DB_URL } = require('./config/db.config.js');
const mongoose = require('mongoose');

/**
 * to read data from body we use body parser
 * and also  to read encoded url  we use body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * connect mongose to app
 * connect to database
 */
mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on('error', () => {
  console.log('Error while connecting to DB');
});
db.once('open', () => {
  console.log('connected to database');
});

/**
 * application routes
 */

/**
 * create new resturant
 */
require('./routes/restaurant.routes')(app);
/**
 * create server
 * @PORT  it's  application port number
 *
 */

app.listen(PORT, () => {
  console.log('connected to server');
});
