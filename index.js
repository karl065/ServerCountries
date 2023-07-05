const express = require('express');
const path = require('path');

const server = require('./src/server');
const {conn} = require('./src/db.js');
const {getApi} = require('./src/connectionApi/ConnectionApi');
const PORT = 3001;

conn
  .sync()
  .then(async () => {
    server.use(express.static(path.join(__dirname, 'build')));

    server.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    await getApi();
  })
  .catch((error) => console.error(error.message));
