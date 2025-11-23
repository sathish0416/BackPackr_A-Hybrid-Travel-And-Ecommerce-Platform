import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const agencySchema = new mongoose.Schema(
  {
    agencyName: {
      type: String,
      required: function() {
        return !this.googleId; // Agency name is required if not Google user
      },
      trim: true,
      maxlength: [100, 'Agency name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId; // Password is required if not Google user
      },
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true // Allows multiple null values
    },
    profileCompleted: {
      type: Boolean,
      default: false
    },
    licenseNumber: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    contactNumber: {
      type: String,
      required: function() {
        return !this.googleId; // Contact number is required if not Google user
      },
      trim: true,
      match: [/^[0-9]{10,15}$/, 'Please enter a valid contact number']
    },
    role: {
      type: String,
      default: "agency",
      enum: ["user", "agency", "admin"]
    },
    isApproved: {
      type: Boolean,
      default: false
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
    passwordResetAttempts: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Hash password before saving
agencySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
agencySchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
agencySchema.methods.getJwtToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Generate password reset token
agencySchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Hash token and save to database
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  // Set expiry time (15 minutes)
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  
  // Reset attempts counter
  this.passwordResetAttempts = 0;
  
  // Return unhashed token (this will be sent via email)
  return resetToken;
};

// Check if password reset token is valid
agencySchema.methods.isPasswordResetTokenValid = function(resetToken) {
  if (!this.passwordResetToken || !this.passwordResetExpires) {
    return false;
  }
  
  // Check if token has expired
  if (this.passwordResetExpires < Date.now()) {
    return false;
  }
  
  // Check if too many attempts have been made
  if (this.passwordResetAttempts >= 3) {
    return false;
  }
  
  // Hash the incoming token and compare with stored token
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  return this.passwordResetToken === hashedToken;
};

// Increment password reset attempts
agencySchema.methods.incrementPasswordResetAttempts = function() {
  this.passwordResetAttempts += 1;
  return this.save();
};

// Clear password reset fields
agencySchema.methods.clearPasswordResetFields = function() {
  this.passwordResetToken = undefined;
  this.passwordResetExpires = undefined;
  this.passwordResetAttempts = 0;
  return this.save();
};

const Agency = mongoose.model("Agency", agencySchema);
export default Agency;
