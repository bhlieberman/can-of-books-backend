'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();
app.use(cors());

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', () => console.error('could not connect'));
db.once('open', () => console.log('connected to Mongo'));


const PORT = process.env.PORT || 3001;

const getBooks = async (request, response) => {
  try {
    const results = await Book.find();
    response.status(200).send(results);
  } catch (error) {
    response.status(500).send(response);
  }
}

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', getBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
