const productModel = require('../models/testproducts');
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

const getProduct = async (req, res) => {
    logger.info('in product');
    Product.findById(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            logger.error(err);
        });
}

const createProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body);
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