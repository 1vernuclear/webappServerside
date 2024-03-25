require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./logger');

//const dbConnectionUrl = process.env.DATABASE_URI; // Use an environment variable for the DB connection string
const dbConnectionUrl = 'mongodb://localhost:27017/myWebAppDB';

const connectDB = async (attempts = 5, delay = 5000) => { // Add default parameters for attempts and delay
    for (let i = 0; i < attempts; i++) {
        try {
            await mongoose.connect(dbConnectionUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            logger.info('MongoDB Connected...');
            return; // Exit the function successfully if connection is made
        } catch (err) {
            logger.error(`Attempt ${i + 1}: Failed to connect to MongoDB`, err);
            if (i < attempts - 1) { // Check if more attempts should be made
                logger.info(`Retrying to connect in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the specified delay
            } else {
                logger.error('All attempts to connect to MongoDB failed');
                // Instead of exiting, you could choose to handle this case differently
                // For example, send an alert to an admin or write to a log file
            }
        }
    }
};

module.exports = connectDB;
