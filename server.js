const express = require('express');
require('dotenv').config();
const product = require('./models/testproducts');
const logger = require('./utils/logger'); // import logger
const connectDB = require('./utils/database'); 
const path = require('path');
const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = express();
server.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000; 

/**Path to react build, ie. path to static files, 
 * making them referable from the frontend / browser.
 * The join results in the path: /opt/webapp/client/dist */
server.use(express.static(path.join(__dirname, '../client/dist')));
var pathstatic = path.join(__dirname, '../client/dist');

/**method that logs all requests making it past the nginx server
meaning all requests with a /api extension (nginx server removes the /api extension, 
before forwarding the request to the server).*/
server.use((req, res, next) => {
  const logInfo = {
    timestamp: new Date().toISOString(),
    host: req.hostname,
    path: req.path,
    method: req.method,
  };
  logger.info('New request made', logInfo);
  console.log('Static files path', pathstatic); //test log to be removed.
  next();
});

server.use((req, res) => {
  logger.error('404 invoked');
  res.status(404).render('404');
}); 

async function startServer() {
  await connectDB(); // Make sure the database is connected before starting the server.
  server.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`)
  });
}

startServer().catch(err => logger.error('Failed to start the server', err));
