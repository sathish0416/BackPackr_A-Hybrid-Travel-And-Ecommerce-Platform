import express from 'express';
import { getGoogleAuthUrl, handleGoogleCallback } from '../utils/googleAuth.js';

const router = express.Router();

// Get Google OAuth URL
router.get('/google', (req, res) => {
  const { userType = 'user' } = req.query;
  const authUrl = getGoogleAuthUrl(userType);
  res.json({ authUrl });
});

// Handle Google OAuth callback
router.get('/google/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Authorization code is required'
      });
    }
    
    const { userType = 'user' } = state ? JSON.parse(state) : {};
    const result = await handleGoogleCallback(code, userType);
    
    // Redirect to frontend with token
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const redirectUrl = `${frontendUrl}/auth/callback?token=${result.token}&userType=${userType}`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Google callback error:', error);
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/login/${req.query.userType || 'user'}?error=google_auth_failed`);
  }
});

export default router;
