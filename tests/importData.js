require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');

// Connection URL and Database Name
const uri = process.env.DATABASE_URI; 
const dbName = process.env.DATABASE_NAME;
const client = new MongoClient(uri);

// Path to your JSON file
const fileName = process.env.PRODUCTS_JSON;
console.log(fileName);

// Function to insert documents
async function insertDocuments(db) {
  // Collection name
  const collection = db.collection('testCollection');
  // Read the JSON file
  const fileData = fs.readFileSync(fileName);
  const documents = JSON.parse(fileData);

  // Insert documents into collection
  const insertResult = await collection.insertMany(documents);
  console.log('Inserted documents:', insertResult.insertedCount);
}

// Use connect method to connect to the server
async function main() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    await insertDocuments(db);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
