const product = require('../models/testproducts');
const connectDB = require('../utils/database');
const logger = require('../utils/logger');
const express = require('express');
const path = require('path');
const PORT = 3000;
const server = express();

server.use(express.urlencoded({ extended: true }));

server.post('products/:id', async (req, res) => {
    try {
        const product = await productModel.create(req.body);
        res.status(200).json(product);
    } catch (error){
        logger.error('Failed post');
        res.status(500).json({message: error.message });
    }
})

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

server.get('/product', (req, res) => {
    logger.info('in product');
    product.findById('6601ad24b90e8b93eabc113a')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            logger.error(err);
        });
});

server.get('/all-products', (req, res) => {
    logger.info('in all products');
    product.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            logger.error(err);
        });
});

async function startServer() {
    await connectDB(); // Make sure the database is connected before starting the server.
    server.listen(PORT, () => {
        logger.info(`Server is running on http://localhost:${PORT}`)
    });
}

startServer().catch(err => logger.error('Failed to start the server', err));