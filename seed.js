'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();

// Check the name of your environment variable:
mongoose.connect(process.env.DB_URL);

// Check the name of your module:
const Book = require('./models/book.js');

async function seed() {

  console.log('seeding books...');

  await Book.create({
    title: 'The Silent Patient',
    description:
      'a women may or may not have killed her husband and a theapist is determind to make her talk to discover her secrets.',
    status: true,
  });

  await Book.create({
    title: 'The Growth Mindset',
    description:
      'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.',
    status: true,
  });

  await Book.create({
    title: 'The Blind Assassin',
    description:
      'Margaret Atwood takes the art of storytelling to new heights in a dazzling novel that unfolds layer by astonishing layer and concludes in a brilliant and wonderfully satisfying twist. Told in a style that magnificently captures the colloquialisms and clichés of the 1930s and 1940s, The Blind Assassin is a richly layered and uniquely rewarding experience.',
    status: true,
  });

  console.log('done seeding!');

  mongoose.disconnect();
}

seed();