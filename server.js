const express = require('express');
require('dotenv').config();
const logger = require('./utils/logger'); // import logger
const connectDB = require('./utils/database'); 

const app = express();
const PORT = 3000;

async function startServer() {
  await connectDB(); // Make sure the database is connected before starting the server.
  app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
  });
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

startServer().catch(err => logger.error('Failed to start the server', err));
