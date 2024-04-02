const server = require('./src/server');
const {conn} = require('./src/db.js');
const {getApi} = require('./src/connectionApi/ConnectionApi');
const PORT = 3001;

conn
  .sync()
  .then(async () => {
    server.listen(PORT, 0.0.0.0,() => {
      console.log(`Server listening on port ${PORT}`);
    });
    await getApi();
  })
  .catch((error) => console.error(error.message));
