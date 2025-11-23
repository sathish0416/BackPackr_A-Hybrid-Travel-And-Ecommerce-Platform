import { StatusCodes } from 'http-status-codes';
import { getJwtToken } from '../utils/jwtToken.js';
import { sendPasswordResetEmail, sendPasswordResetConfirmationEmail } from '../utils/emailService.js';
import crypto from 'crypto';

// Helper function to get models from app settings
const getModels = (req) => ({
  User: req.app.get('User'),
  Agency: req.app.get('Agency')
});

// Models will be passed from the route handler
let User, Agency;

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const registerUser = (User) => async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    // Generate JWT token
    const token = user.getJwtToken();

    res.status(StatusCodes.CREATED).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const loginUser = (User) => async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = user.getJwtToken();

    res.status(StatusCodes.OK).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// @desc    Register a new agency
// @route   POST /api/v1/auth/agency/register
// @access  Public
export const registerAgency = (Agency) => async (req, res, next) => {
  try {
    const { agencyName, email, password, contactNumber } = req.body;
    
    // Get models from app settings
    const { User } = getModels(req);

    // Check if agency already exists
    const existingAgency = await Agency.findOne({ email });
    if (existingAgency) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Agency already exists with this email'
      });
    }

    // Check if contact number already exists in either User or Agency collections
    if (contactNumber) {
      const existingContactInAgency = await Agency.findOne({ contactNumber });
      const existingContactInUser = await User.findOne({ contactNumber });
      
      if (existingContactInAgency || existingContactInUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'This contact number is already registered. Please use a different number.'
        });
      }
    }

    // Create new agency
    const agency = await Agency.create({
      agencyName,
      email,
      password,
      contactNumber,
      role: 'agency',
      isApproved: false // Needs admin approval
    });

    // Generate JWT token
    const token = agency.getJwtToken();

    res.status(StatusCodes.CREATED).json({
      success: true,
      token,
      agency: {
        id: agency._id,
        agencyName: agency.agencyName,
        email: agency.email,
        role: agency.role,
        isApproved: agency.isApproved
      },
      message: 'Agency registered successfully. Waiting for admin approval.'
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error registering agency',
      error: error.message
    });
  }
};

// @desc    Login agency
// @route   POST /api/v1/auth/agency/login
// @access  Public
export const loginAgency = (Agency) => async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if agency exists and password is correct
    const agency = await Agency.findOne({ email }).select('+password');
    
    if (!agency || !(await agency.comparePassword(password))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if agency is approved
    if (!agency.isApproved) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: 'Your account is pending approval from admin'
      });
    }

    // Generate JWT token
    const token = agency.getJwtToken();

    res.status(StatusCodes.OK).json({
      success: true,
      token,
      agency: {
        id: agency._id,
        agencyName: agency.agencyName,
        email: agency.email,
        role: agency.role,
        isApproved: agency.isApproved
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// @desc    Get current logged in user/agency
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = (User, Agency) => async (req, res) => {
  try {
    let user;
    
    if (req.user.role === 'agency') {
      user = await Agency.findById(req.user.id);
    } else {
      user = await User.findById(req.user.id);
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message
    });
  }
};

// @desc    Forgot password for users
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = (User, Agency) => async (req, res) => {
  try {
    const { email, userType = 'user' } = req.body;

    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Please provide your email address'
      });
    }

    // Find user or agency based on user type
    let user;
    if (userType === 'agency') {
      user = await Agency.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      // Don't reveal if email exists or not for security
      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Send reset email
    try {
      await sendPasswordResetEmail(email, resetToken, userType);
      
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Password reset link sent to your email'
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // Clear reset token if email fails
      user.clearPasswordResetFields();
      
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to send password reset email. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

// @desc    Reset password
// @route   POST /api/v1/auth/reset-password
// @access  Public
export const resetPassword = (User, Agency) => async (req, res) => {
  try {
    const { token, newPassword, userType = 'user' } = req.body;

    if (!token || !newPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Please provide reset token and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Find user by reset token
    let user;
    if (userType === 'agency') {
      user = await Agency.findOne({
        passwordResetToken: crypto.createHash('sha256').update(token).digest('hex'),
        passwordResetExpires: { $gt: Date.now() }
      }).select('+passwordResetToken +passwordResetExpires +passwordResetAttempts');
    } else {
      user = await User.findOne({
        passwordResetToken: crypto.createHash('sha256').update(token).digest('hex'),
        passwordResetExpires: { $gt: Date.now() }
      }).select('+passwordResetToken +passwordResetExpires +passwordResetAttempts');
    }

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Check if too many attempts have been made
    if (user.passwordResetAttempts >= 3) {
      await user.clearPasswordResetFields();
      return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
        success: false,
        message: 'Too many reset attempts. Please request a new password reset.'
      });
    }

    // Validate the token using the model method
    const isValidToken = user.isPasswordResetTokenValid(token);
    if (!isValidToken) {
      await user.incrementPasswordResetAttempts();
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Update password
    user.password = newPassword;
    
    // Clear reset fields
    await user.clearPasswordResetFields();

    // Send confirmation email
    try {
      await sendPasswordResetConfirmationEmail(user.email, userType);
    } catch (emailError) {
      console.error('Confirmation email error:', emailError);
      // Don't fail the request if confirmation email fails
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Password reset successfully. You can now sign in with your new password.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};
