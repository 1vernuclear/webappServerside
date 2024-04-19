const Orders = require('../models/orders');
const procuts = require('../models/products');
const logger = require('../utils/logger');

const getOrders = async (req, res) => {
    logger.info('in all Orders');
    Orders.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            logger.error(err);
        });
};

const getOrder = async (req, res) => {
    try {
        const order = await Orders.findById(req.params.id);
        if (!orders) {
            // No product found, respond with a 404
            return res.status(404).render('404', 'Product not found');
        }
        logger.info('retrieve product');
        res.json(orders);
    } catch (err) {
        // If an error occurs, send a generic 500 status code or specific status code based on the error
        res.status(500).json({ error: 'Something unexpected occurred' }); // Adjusted to send JSON response
    }
}

const createOrder = async (req, res) => {
    logger.info('In CreateOrder');
    try {
        logger.info('Request Body: ' + JSON.stringify(req.body));
        const order = await Orders.create(req.body);
        res.status(200).json(order);
    } catch (error) {
        logger.error('Failed post');
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {

    Orders.findByIdAndDelete(req.params.id)
        .then(result => {
            //res.json({ redirect: '/orders' })
        }).
        catch(err => {
            logger.error(err);
        })
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder
};