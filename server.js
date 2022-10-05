'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');
const { request, response } = require('express');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', () => console.error('could not connect'));
db.once('open', () => console.log('connected to Mongo'));


const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

// GET BOOKS

const getBooks = async (request, response) => {
  try {
    const results = await Book.find();
    response.status(200).send(results);
  } catch (error) {
    next(error)
  }
}

app.get("/books", getBooks);

// POST BOOKS

const postBooks = async (request, response, next) => {
  try {
    const book = await Book.create(request.body);
    response.status(201).send(book);
  } catch (error) {
    next(error);
  }
}

app.post("/books", postBooks);

// DELETE BOOKS


const deleteBooks = async (request, response, next) => {
  try {
    const id = request.params.id;
    await Book.findByIdAndDelete(id);
    response.status(204).send('book deleted');
  } catch (error) {
    next(error);
  }
}

app.delete("/books/:id", deleteBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.use((error, request, response) => {
  response.error(500).send(error.message);
})