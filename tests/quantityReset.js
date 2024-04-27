const connectDB = require('../utils/database');
const Product = require('../models/products');
const logger = require('../utils/logger');
const mongoose = require('mongoose'); 

async function runTests() {
    try {
        
        const dbConnection = await connectDB();

        // Set all products' quantity to 100
        await Product.updateMany({}, { quantity: 100 });

        
        const products = await Product.find();

        // Check if all products have quantity set to 100
        products.forEach(product => {
            if (product.quantity !== 100) {
                throw new Error(`Product ${product.name} has quantity ${product.quantity}, expected 100`);
            }
        });

        logger.info('All products\' quantity set to 100 successfully');
    } catch (error) {
        logger.error(`Test failed: ${error.message}`);
    } finally {
        // Close the database connection
        if (mongoose.connection) {
            mongoose.connection.close();
            logger.info('MongoDB connection closed');
        }
    }
}


runTests();