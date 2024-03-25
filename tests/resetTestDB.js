//require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');

// Connection URL and Database Name
//const uri = process.env.DATABASE_URI; 
//const dbName = process.env.DATABASE_NAME;
//local link
const uri = 'mongodb://localhost:27017/myWebAppDB';
const dbName = 'myWepAppDB';

const client = new MongoClient(uri);

// Path to your JSON file
const fileName = process.env.PRODUCTS_JSON;
console.log(fileName);

// Function to insert documents
async function insertDocuments(db) {
  // Collection name
  const collection = db.collection('testCollection');

  // Wipe all documents from the collection
  await collection.deleteMany({});

  // Read the JSON file
  const fileData = fs.readFileSync(fileName);
  let documents = JSON.parse(fileData);

  // Set the quantity of each product to 50
  documents = documents.map(doc => ({ ...doc, quantity: 50 }));

  // Insert modified documents into collection
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
