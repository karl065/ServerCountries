const express = require('express');
const path = require('path');

const server = require('./src/server');
const {conn} = require('./src/db.js');
const {getApi} = require('./src/connectionApi/ConnectionApi');
const PORT = 3001;

server.use(express.static(path.join(__dirname, 'build')));

server.get('/countries', (req, res) => {
  // Manejo de la ruta '/api/example'
  res.send('Respuesta desde el backend');
});

server.get('*', function (req, res) {
  res.redirect('https://clientcountries.onrender.com' + req.originalUrl);
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
