const express = require('express');
const path = require('path');

const server = require('./src/server');
const {conn} = require('./src/db.js');
const {getApi} = require('./src/connectionApi/ConnectionApi');
const PORT = 3001;

server.use(express.static(path.join(__dirname, 'build')));

server.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.get('/createactivity', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.get('/detail', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

conn
  .sync()
  .then(async () => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    await getApi();
  })
  .catch((error) => console.error(error.message));
