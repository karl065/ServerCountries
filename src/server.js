const express = require('express');
const router = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(
  cors({
    origin: 'https://clientcountries.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  })
);

server.use(express.static(path.join(__dirname, 'build')));

server.use(router);

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({error: err.message});
});

module.exports = server;
