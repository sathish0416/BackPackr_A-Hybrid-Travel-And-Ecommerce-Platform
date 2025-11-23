import { google } from 'googleapis';
import User from '../models/User.js';
import Agency from '../models/Agency.js';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Generate Google OAuth URL
export const getGoogleAuthUrl = (userType = 'user') => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];
  
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: JSON.stringify({ userType }),
    prompt: 'consent'
  });
  
  return url;
};

// Handle Google OAuth callback
export const handleGoogleCallback = async (code, userType) => {
  try {
    // Get tokens from Google
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    // Get user info from Google
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();
    
    const { email, name, picture, id: googleId } = userInfo;
    
    // Check if user/agency already exists
    const Model = userType === 'agency' ? Agency : User;
    let existingUser = await Model.findOne({ email });
    
    if (existingUser) {
      // User exists, check if they have Google ID
      if (!existingUser.googleId) {
        existingUser.googleId = googleId;
        existingUser.isVerified = true; // Auto-verify Google users
        await existingUser.save();
      }
      
      // Generate JWT token
      const token = existingUser.getJwtToken();
      
      return {
        success: true,
        token,
        user: {
          id: existingUser._id,
          name: existingUser.name || existingUser.agencyName,
          email: existingUser.email,
          role: existingUser.role,
          profileCompleted: existingUser.profileCompleted || false,
          isFirstTimeGoogleUser: false, // This is a returning user
          ...(userType === 'agency' && { isApproved: existingUser.isApproved })
        }
      };
    } else {
      // Create new user/agency
      const userData = userType === 'agency' 
        ? {
            agencyName: name,
            email,
            googleId,
            isVerified: true,
            isApproved: false, // Agencies still need approval
            role: 'agency',
            profileCompleted: false, // New users need to complete profile
            // Generate random password for Google users
            password: Math.random().toString(36).slice(-8) + 'Google123!'
          }
        : {
            name,
            email,
            googleId,
            isVerified: true,
            role: 'user',
            profileCompleted: false, // New users need to complete profile
            // Generate random password for Google users
            password: Math.random().toString(36).slice(-8) + 'Google123!'
          };
      
      const newUser = await Model.create(userData);
      const token = newUser.getJwtToken();
      
      return {
        success: true,
        token,
        user: {
          id: newUser._id,
          name: newUser.name || newUser.agencyName,
          email: newUser.email,
          role: newUser.role,
          profileCompleted: false, // New Google users need to complete profile
          isFirstTimeGoogleUser: true, // Flag for first-time users
          ...(userType === 'agency' && { isApproved: newUser.isApproved })
        },
        message: userType === 'agency' 
          ? 'Agency registered successfully. Waiting for admin approval.'
          : 'User registered successfully.'
      };
    }
  } catch (error) {
    console.error('Google OAuth error:', error);
    throw new Error('Failed to authenticate with Google');
  }
};
