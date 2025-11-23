import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import googleRoutes from './routes/googleRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import { StatusCodes } from 'http-status-codes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Import models after database connection is established
let User, Agency;

const startServer = async () => {
  try {
    // First connect to database
    await connectDB();
    
    // Then import models
    const userModule = await import('./models/User.js');
    const agencyModule = await import('./models/Agency.js');
    User = userModule.default;
    Agency = agencyModule.default;
    
    // Set models in app locals for access in routes
    app.set('User', User);
    app.set('Agency', Agency);
    
    console.log('🔍 Registered models:', Object.keys(mongoose.connection.models));
    
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`🌐 API URL: http://localhost:${PORT}/api`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION! 💥 Shutting down...');
      console.error(err.name, err.message);
      
      // Close server & exit process
      server.close(() => {
        console.log('💥 Process terminated!');
        process.exit(1);
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', googleRoutes);
app.use('/api/auth', profileRoutes);

// Test route to check if server is running
app.get('/api/health', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Backpackr API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const statusText = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }[dbStatus] || 'unknown';
    
    res.status(200).json({
      success: true,
      dbStatus: statusText,
      message: 'Database connection test',
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database test failed',
      error: error.message,
      nodeEnv: process.env.NODE_ENV || 'development'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Export app for testing
export { app };
