import express from 'express';
import User from '../models/User.js';
import Agency from '../models/Agency.js';
import { StatusCodes } from 'http-status-codes';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Complete user profile
router.put('/user/complete-profile', isAuthenticated, async (req, res) => {
  try {
    const { name, contactNumber, dateOfBirth, nationality } = req.body;
    const userId = req.user.id; // Get ID from authenticated user

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user profile
    user.name = name || user.name;
    user.contactNumber = contactNumber || user.contactNumber;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.nationality = nationality || user.nationality;
    user.profileCompleted = true;

    await user.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Profile completed successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        contactNumber: user.contactNumber,
        dateOfBirth: user.dateOfBirth,
        nationality: user.nationality,
        profileCompleted: user.profileCompleted
      }
    });
  } catch (error) {
    console.error('Complete profile error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to complete profile'
    });
  }
});

// Complete agency profile
router.put('/agency/complete-profile', isAuthenticated, async (req, res) => {
  try {
    const { agencyName, contactNumber, licenseNumber, address, description } = req.body;
    const userId = req.user.id; // Get ID from authenticated user

    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const agency = await Agency.findById(userId);
    if (!agency) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Agency not found'
      });
    }

    // Update agency profile
    agency.agencyName = agencyName || agency.agencyName;
    agency.contactNumber = contactNumber || agency.contactNumber;
    agency.licenseNumber = licenseNumber || agency.licenseNumber;
    agency.address = address || agency.address;
    agency.description = description || agency.description;
    agency.profileCompleted = true;

    await agency.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Agency profile completed successfully',
      user: {
        id: agency._id,
        agencyName: agency.agencyName,
        email: agency.email,
        role: agency.role,
        contactNumber: agency.contactNumber,
        licenseNumber: agency.licenseNumber,
        address: agency.address,
        description: agency.description,
        profileCompleted: agency.profileCompleted,
        isApproved: agency.isApproved,
        isVerified: agency.isVerified
      }
    });
  } catch (error) {
    console.error('Complete agency profile error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to complete agency profile'
    });
  }
});

export default router;
