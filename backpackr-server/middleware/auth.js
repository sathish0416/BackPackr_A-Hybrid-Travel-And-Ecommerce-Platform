import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/jwtToken.js';
import User from '../models/User.js';
import Agency from '../models/Agency.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Please login to access this resource'
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    
    // Find user based on role
    let user;
    if (decoded.role === 'agency') {
      user = await Agency.findById(decoded.id);
    } else {
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'User not found with this token'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Not authorized to access this route',
      error: error.message
    });
  }
};

// Role-based authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: `Role (${req.user.role}) is not allowed to access this resource`
      });
    }
    next();
  };
};
