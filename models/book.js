'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const book = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: Boolean, required: true },
    }
);

const bookModel = mongoose.model('book', book);

module.exports = bookModel;