const Product = require('../models/products');
const logger = require('../utils/logger');

const getProducts = async (req, res) => {
    logger.info('in all products');
    Product.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            logger.error(err);
        });
};

/**
 * We use the if statement in the try block, to catch expected errors.
 * Expected erros could be something like a request for non existing product,
 * or just a wrongly formatted request. 
 * The catch block is used for unexpected errors like a failed connection to the db.
 * @param {Incoming request} req 
 * @param {Response} res 
 */
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            // No product found, respond with a 404
            return res.status(404).render('404', 'Product not found');
        }
        logger.info('retrieve product');
        res.json(product);
    } catch (err) {
        // If an error occurs, send a generic 500 status code or specific status code based on the error
        res.status(500).json({ error: 'Something unexpected occurred' }); // Adjusted to send JSON response
    }
}

const updateProduct = async (req, res) => {
    //quantity
    //id
} ;

const createProduct = async (req, res) => {
    try {
        logger.info(req.body);
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        logger.error('Failed post');
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {

    Product.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json({ redirect: '/products' })
        }).
        catch(err => {
            logger.error(err);
        })
};

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    deleteProduct
};