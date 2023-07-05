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

server.use(express.static('public'));

server.use(router);

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = server;
