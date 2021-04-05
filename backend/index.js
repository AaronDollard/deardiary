const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const countries = require('./routes/countries');
const user = require('./routes/user');
const mongoose = require('mongoose');
const config = require('./config');
var cors = require('cors');

const app = express();
const port = 3000;


// Define the database connecton and connect to it.
// Errors awill be logged to the console.
// this would normally come from a config file

const databaseConnectionString = config.connectionString

mongoose.connect(databaseConnectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Country database connected!")
});


// Configuring the built-in express body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Cors middleware
app.use(cors(
  {
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'], //The host you wanna use
  credentials: true
}
));

app.use('/countries', countries);
app.use('/user', user);


app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
})



app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.listen(port, () => console.log(`Example app listening on ${port}!`))
