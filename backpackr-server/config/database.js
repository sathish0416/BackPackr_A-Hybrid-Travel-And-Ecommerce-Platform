import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connection configuration
const connectionOptions = {
  // Remove deprecated options
  // useNewUrlParser and useUnifiedTopology are no longer needed in Mongoose 6+
  // as they are now the default behavior
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  maxPoolSize: 10, // Maintain up to 10 socket connections
};

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MongoDB URI is not defined in environment variables');
  process.exit(1);
}

// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`Mongoose: ${collectionName}.${method}`, JSON.stringify(query), doc);
  });
}

// Cache the connection to avoid multiple connections in development
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  try {
    if (cached.conn) {
      console.log('✅ Using existing database connection');
      return cached.conn;
    }

    if (!cached.promise) {
      console.log('🌐 Creating new database connection...');
      console.log(`Connecting to: ${MONGODB_URI.split('@')[1]?.split('?')[0] || MONGODB_URI}`);
      
      cached.promise = mongoose.connect(MONGODB_URI, connectionOptions)
        .then((mongoose) => {
          console.log('🍃 MongoDB Connected Successfully');
          console.log(`  - Host: ${mongoose.connection.host}`);
          console.log(`  - Database: ${mongoose.connection.name}`);
          console.log(`  - Port: ${mongoose.connection.port}`);
          console.log(`  - Models: ${Object.keys(mongoose.connection.models).join(', ') || 'None'}`);
          return mongoose;
        });
    }

    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    
    // Provide more detailed error information
    if (error.name === 'MongooseServerSelectionError') {
      console.error('  - This usually indicates that the MongoDB server is not running or not accessible');
      console.error('  - Please check if MongoDB is running and the connection string is correct');
      console.error('  - If using MongoDB Atlas, ensure your IP is whitelisted');
    } else if (error.name === 'MongooseError') {
      console.error('  - A general Mongoose error occurred');
    } else if (error.name === 'ValidationError') {
      console.error('  - A validation error occurred');
    }
    
    // Don't exit the process in development to allow for auto-restart
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    
    throw error; // Re-throw to be caught by the server
  }
};

// Connection events
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');  
  console.log(`  - Ready state: ${mongoose.connection.readyState}`);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('ℹ️  MongoDB disconnected');
});

// Close the connection when the Node process ends
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

export default connectDB;
