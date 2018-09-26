'use strict';

const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const { db } = require('./db');
const PORT = 1337;

const app = express();

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api')); // include our routes!

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

db.sync().then(() => {
  console.log('db synced');
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
});
