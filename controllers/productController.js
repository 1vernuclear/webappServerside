const Product = require('../models/products');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

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
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            // No product found, respond with a 404
            return res.status(404).json('404', 'Product not found');
        }
        logger.info('retrieve product');
        res.json(product);
    } catch (err) {
        // If an error occurs, send a generic 500 status code or specific status code based on the error
        res.status(500).json({ error: 'Something unexpected occurred', detail: err.message }); // Adjusted to send JSON response
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    let { quantityBought } = req.body;

    // Convert quantityBought to a number
    quantityBought = parseInt(quantityBought);

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (isNaN(quantityBought) || quantityBought <= 0) {
            return res.status(400).json({ error: 'Invalid quantity value' });
        }

        if (product.quantity < quantityBought) {
            return res.status(400).json({ error: 'Insufficient quantity available' });
        }

        // Subtract the quantity bought from the available quantity
        product.quantity -= quantityBought;

        // Save the updated product back to the database
        await product.save();

        logger.info(`Updated product quantity for ID ${id} - Quantity deducted: ${quantityBought}`);
        res.status(200).json({ message: 'Product quantity updated successfully', updatedProduct: product });
    } catch (error) {
        logger.error(`Failed to update product quantity for ID ${id}: ${error.message}`);
        res.status(500).json({ error: 'Failed to update product quantity' });
    }
};


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
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    Product.findByIdAndDelete(id)
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
    deleteProduct,
    updateProduct
};