require('dotenv').config();
const { MongoClient } = require('mongodb');
const logger = require('../utils/logger')

// Replace 'your_connection_string' with your actual connection string.
const uri = process.env.DATABASE_URI; 

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  } finally {
    await client.close();
  }
}

run();
