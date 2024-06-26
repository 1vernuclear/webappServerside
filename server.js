const express = require('express');
require('dotenv').config();
const logger = require('./utils/logger'); 
const connectDB = require('./utils/database'); 
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT;
const server = express();
server.set('view engine', 'ejs');
const cookieParser = require('cookie-parser');
const { csrfProtection, attachCsrfToken } = require('./middlewares/csrf'); 
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const corsMiddleware = require('./middlewares/cors');
const limiterMiddleware = require('./middlewares/rateLimit');
//const apiKeyMiddleware = require('./middlewares//apiKey'); //could be applied when the app has user profiles.
//api key middleware
//server.use(apiKeyMiddleware);

//api Limiter
server.use('/api/', limiterMiddleware);

//cross-site request forgery protection.
server.use(cookieParser()); 
server.use(csrfProtection);
server.use(attachCsrfToken);

//cross site resource sharring
server.use(corsMiddleware);

server.set('trust proxy', 1);  // Trust first proxy
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

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
  //console.log('Static files path', pathstatic); //test log to be removed.
  next();
});

// Serve static files from the 'public' directory
server.use(express.static(path.join(__dirname, 'public')));
server.use('/products', productRouter);
server.use('/orders', orderRouter);

server.use((req, res) => {
  logger.error('404 invoked');
  res.status(404).render('404');
}); 

server.use((err, _req, res) => {
  logger.error(`Server error: ${err.message}`, { stack: err.stack });
  res.status(500).render('500', { error: err });
});


async function startServer() {
  await connectDB(); // Make sure the database is connected before starting the server.
  server.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`)
  });
}

startServer().catch(err => {
  logger.error('Failed to start the server', err);
  process.exit(1); // Exit the process with a non-zero status code indicating failure, maybe send mail to dev (Nicolai)
});

