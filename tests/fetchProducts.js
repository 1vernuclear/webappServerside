require('dotenv').config();
const { MongoClient } = require('mongodb');

// Replace 'your_connection_string' with your actual connection string.
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchProduct() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const database = client.db('webapp'); // Replace 'your_database_name' with your actual database name.
    const products = database.collection('products'); // Assuming your collection is named 'products'.

    // Replace 'your_product_id' with the actual product ID you want to fetch.
    const productId = '1';
    const query = { id: productId };

    const product = await products.findOne(query);

    if (product) {
      console.log('Fetched product:', product);
    } else {
      console.log('No product found with id:', productId);
    }
  } catch (err) {
    console.error('Failed to fetch product from MongoDB', err);
  } finally {
    await client.close();
  }
}

fetchProduct();
