import express from 'express';
import { 
  registerUser, 
  loginUser, 
  registerAgency, 
  loginAgency, 
  getMe,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Get models from app settings
const getModels = (req) => ({
  User: req.app.get('User'),
  Agency: req.app.get('Agency')
});

// User routes
router.post('/register', (req, res, next) => {
  const { User } = getModels(req);
  return registerUser(User)(req, res, next);
});

router.post('/login', (req, res, next) => {
  const { User } = getModels(req);
  return loginUser(User)(req, res, next);
});

// Agency routes
router.post('/agency/register', (req, res, next) => {
  const { User, Agency } = getModels(req);
  return registerAgency(Agency)(req, res, next);
});

router.post('/agency/login', (req, res, next) => {
  const { Agency } = getModels(req);
  return loginAgency(Agency)(req, res, next);
});

// Protected route to get current user/agency
router.get('/me', isAuthenticated, (req, res, next) => {
  const { User, Agency } = getModels(req);
  return getMe(User, Agency)(req, res, next);
});

// Forgot password route
router.post('/forgot-password', (req, res, next) => {
  const { User, Agency } = getModels(req);
  return forgotPassword(User, Agency)(req, res, next);
});

// Reset password route
router.post('/reset-password', (req, res, next) => {
  const { User, Agency } = getModels(req);
  return resetPassword(User, Agency)(req, res, next);
});

export default router;
