require('dotenv').config();
const mongoose = require('mongoose');
const { connectToMongoDB } = require('../config/mongodb');

async function testMongoDB() {
  try {
    const conn = await connectToMongoDB();
    
    // Test if we can perform a simple operation
    const db = conn.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    // Keep the connection open for a few seconds to see the events
    setTimeout(async () => {
      await mongoose.connection.close();
      console.log('Test completed');
      process.exit(0);
    }, 5000);
  } catch (error) {
    console.error('MongoDB test failed:', error);
    process.exit(1);
  }
}

testMongoDB(); 