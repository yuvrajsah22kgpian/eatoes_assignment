const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDB = async () => {
    try {
        // Ensure we're using localhost instead of ::1
        const mongoURI = process.env.MONGODB_URI.replace('mongodb://localhost', 'mongodb://127.0.0.1');
        
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4 // Force IPv4
        };

        console.log('Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(mongoURI, options);
        
        console.log('MongoDB Connected Successfully!');
        console.log(`MongoDB Host: ${conn.connection.host}`);
        console.log(`MongoDB Database: ${conn.connection.name}`);

        // Connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        // Handle process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });

        return conn;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('Please ensure MongoDB is running and accessible');
        console.log('You can start MongoDB service using: net start MongoDB');
        process.exit(1);
    }
};

module.exports = {
    connectToMongoDB
};