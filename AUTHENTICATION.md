# Authentication System Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [User Roles & Permissions](#user-roles--permissions)
4. [Authentication Flows](#authentication-flows)
5. [Frontend Implementation](#frontend-implementation)
6. [Backend Implementation](#backend-implementation)
7. [Security Features](#security-features)
8. [Validation System](#validation-system)
9. [Error Handling](#error-handling)
10. [Testing Guide](#testing-guide)
11. [Troubleshooting](#troubleshooting)

---

## 🔍 Overview

The Backpackr authentication system is a comprehensive, multi-role authentication solution built with JWT tokens and Google OAuth integration. It provides secure user management with real-time validation, password strength indicators, and role-based access control.

### **Key Features**
- **Multi-Role Support**: Users, Travel Agencies, and Admins
- **Dual Authentication**: Email/Password + Google OAuth
- **Real-time Validation**: Instant feedback on all forms
- **Password Security**: Strength indicators and visibility toggles
- **Mobile Validation**: 10-15 digit format with uniqueness checks
- **Secure Token Management**: JWT with proper expiration
- **Profile Completion**: Additional details for OAuth users

---

## 🏗️ Architecture

### **Authentication Flow Diagram**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)        │    │   (Express)     │    │  (MongoDB)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Login/Register     │                       │
         ├─────────────────────→│                       │
         │                       │ 2. Validate Data     │
         │                       ├─────────────────────→│
         │                       │                       │ 3. Check User
         │                       │←─────────────────────│
         │ 4. JWT Token         │                       │
         │←─────────────────────│                       │
         │                       │                       │
         │ 5. Store Token        │                       │
         │                       │                       │
```

### **Component Structure**
```
Authentication System/
├── Frontend/
│   ├── Context/
│   │   └── AuthContext.jsx          # Global auth state
│   ├── Pages/
│   │   ├── RegisterUser.jsx          # User registration
│   │   ├── RegisterAgency.jsx       # Agency registration
│   │   ├── LoginUser.jsx             # User login
│   │   ├── LoginAgency.jsx          # Agency login
│   │   ├── ForgotPassword.jsx       # Password reset request
│   │   ├── ResetPassword.jsx        # Password reset confirmation
│   │   ├── CompleteUserDetails.jsx  # User profile completion
│   │   └── CompleteAgencyDetails.jsx # Agency profile completion
│   ├── Components/
│   │   └── AuthCallback.jsx          # OAuth callback handler
│   └── Services/
│       └── authService.js            # API calls
├── Backend/
│   ├── Controllers/
│   │   └── authController.js         # Auth logic
│   ├── Middleware/
│   │   └── auth.js                   # JWT verification
│   ├── Models/
│   │   ├── User.js                   # User schema
│   │   └── Agency.js                 # Agency schema
│   └── Routes/
│       ├── authRoutes.js             # Auth endpoints
│       └── googleRoutes.js           # OAuth endpoints
└── Database/
    ├── Users Collection              # User documents
    └── Agencies Collection           # Agency documents
```

---

## 👥 User Roles & Permissions

### **1. User Role**
**Access Level**: Standard user
**Permissions**:
- Browse trips and products
- Purchase travel gear
- Download itineraries
- Book trips from agencies
- Manage personal profile
- View order history

**Registration**: Email/Password or Google OAuth
**Approval**: Automatic (no approval required)

### **2. Agency Role**
**Access Level**: Business user
**Permissions**:
- All user permissions
- Create and manage trips
- View booking requests
- Manage agency profile
- Upload itineraries
- Process bookings

**Registration**: Email/Password or Google OAuth + business details
**Approval**: Manual admin approval required

### **3. Admin Role**
**Access Level**: System administrator
**Permissions**:
- All user and agency permissions
- Approve/reject agency registrations
- Manage all users and agencies
- Platform configuration
- Analytics and reporting

**Registration**: Direct database insertion (no public registration)

---

## 🔄 Authentication Flows

### **1. User Registration Flow**

#### **Email/Password Registration**
```
1. User fills registration form
   ├── Real-time validation
   ├── Password strength indicator
   └── Mobile number format check

2. Frontend validation
   ├── Required fields check
   ├── Email format validation
   ├── Password strength validation
   └── Mobile number uniqueness check

3. Submit to backend
   ├── Create user document
   ├── Hash password with bcrypt
   ├── Generate JWT token
   └── Return success response

4. Redirect to dashboard
```

#### **Google OAuth Registration**
```
1. User clicks "Sign up with Google"
2. Redirect to Google OAuth
3. Google redirects back with code
4. Exchange code for tokens
5. Get user profile from Google
6. Create user in database
7. Redirect to profile completion
8. User completes additional details
9. Generate JWT token
10. Redirect to dashboard
```

### **2. Agency Registration Flow**

#### **Email/Password Registration**
```
1. Agency fills registration form
   ├── Business information
   ├── Contact details
   ├── License number
   └── Agency description

2. Validation checks
   ├── All required fields
   ├── Email uniqueness
   ├── Mobile number uniqueness (cross-collection)
   └── Format validation

3. Create agency account
   ├── Set role: 'agency'
   ├── Set isApproved: false
   ├── Hash password
   └── Save to database

4. Redirect to pending approval page
```

#### **Google OAuth Registration**
```
1. Agency clicks "Sign up with Google"
2. OAuth flow (same as user)
3. Create agency with Google data
4. Redirect to complete profile
5. Add business details
6. Submit for approval
7. Wait for admin approval
```

### **3. Login Flow**

#### **Email/Password Login**
```
1. User enters credentials
2. Real-time validation
3. Submit to backend
4. Find user in database
5. Compare password hashes
6. Generate JWT token
7. Check approval status (agencies)
8. Return user data + token
9. Store in localStorage
10. Redirect to appropriate dashboard
```

#### **Google OAuth Login**
```
1. User clicks "Sign in with Google"
2. OAuth authentication
3. Check if user exists
4. If exists: Login and generate token
5. If new: Redirect to profile completion
6. Complete profile flow
7. Generate token and redirect
```

### **4. Password Reset Flow**

```
1. User requests password reset
   ├── Enter email address
   └── Submit request

2. Backend validation
   ├── Find user by email
   ├── Generate reset token
   ├── Set expiry (15 minutes)
   └── Send reset email

3. User clicks email link
   ├── Validate token
   ├── Show reset form
   └── Allow password change

4. Submit new password
   ├── Validate password strength
   ├── Hash new password
   ├── Clear reset token
   └── Confirm success
```

---

## 🎨 Frontend Implementation

### **1. Authentication Context**

**File**: `src/context/AuthContext.jsx`

```javascript
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Login function
  const login = async (email, password, userType) => {
    // API call and state management
  };

  // Logout function
  const logout = () => {
    // Clear localStorage and state
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### **2. Real-time Validation System**

**Validation Functions**:
```javascript
const validateField = (name, value) => {
  switch (name) {
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) 
        return 'Please enter a valid email address';
      return '';
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return '';
    case 'contactNumber':
      if (!value.trim()) return 'Contact number is required';
      if (!/^[0-9]{10,15}$/.test(value)) 
        return 'Mobile number must be 10-15 digits long';
      return '';
    default:
      return '';
  }
};
```

**Real-time Updates**:
```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Real-time validation
  const error = validateField(name, value);
  setFieldErrors(prev => ({ ...prev, [name]: error }));
};
```

### **3. Password Strength Indicator**

**Strength Calculation**:
```javascript
const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, text: '', color: '' };
  
  let strength = 0;
  
  // Length checks
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  
  // Character variety checks
  if (/[a-z]/.test(password)) strength++; // lowercase
  if (/[A-Z]/.test(password)) strength++; // uppercase
  if (/[0-9]/.test(password)) strength++; // numbers
  if (/[^a-zA-Z0-9]/.test(password)) strength++; // special chars
  
  const strengthLevels = [
    { strength: 0, text: 'Very Weak', color: 'bg-red-500' },
    { strength: 1, text: 'Weak', color: 'bg-red-400' },
    { strength: 2, text: 'Fair', color: 'bg-yellow-500' },
    { strength: 3, text: 'Good', color: 'bg-blue-500' },
    { strength: 4, text: 'Strong', color: 'bg-green-500' },
    { strength: 5, text: 'Very Strong', color: 'bg-green-600' }
  ];
  
  return strengthLevels[Math.min(strength, 5)];
};
```

**Visual Component**:
```jsx
{formData.password && (
  <div className="mt-2">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs text-gray-600">Password strength:</span>
      <span className={`text-xs font-medium ${strengthColor}`}>
        {strengthText}
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div 
        className={`h-1.5 rounded-full transition-all duration-300 ${strengthColor}`}
        style={{ width: `${(strength / 5) * 100}%` }}
      />
    </div>
  </div>
)}
```

### **4. Password Visibility Toggle**

**State Management**:
```javascript
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
```

**Toggle Implementation**:
```jsx
<div className="relative rounded-md shadow-sm">
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    value={formData.password}
    onChange={handleChange}
    className="pr-10" // Space for toggle button
  />
  <button
    type="button"
    className="absolute inset-y-0 right-0 pr-3 flex items-center"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? (
      <EyeOffIcon className="h-5 w-5" />
    ) : (
      <EyeIcon className="h-5 w-5" />
    )}
  </button>
</div>
```

---

## ⚙️ Backend Implementation

### **1. Authentication Controller**

**File**: `backpackr-server/controllers/authController.js`

```javascript
// User Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contactNumber } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      contactNumber
    });
    
    await user.save();
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'user'
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### **2. JWT Middleware**

**File**: `backpackr-server/middleware/auth.js`

```javascript
import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Role-based middleware
export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
```

### **3. Google OAuth Implementation**

**File**: `backpackr-server/routes/googleRoutes.js`

```javascript
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const googleAuth = async (req, res) => {
  const { userType } = req.query;
  
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];
  
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: userType // Pass user type through state
  });
  
  res.json({ authUrl: url });
};

export const googleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const userType = state;
    
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    
    // Find or create user
    let user = await User.findOne({ email: data.email });
    
    if (!user) {
      user = new User({
        name: data.name,
        email: data.email,
        googleId: data.id,
        role: userType,
        isApproved: userType === 'agency' ? false : true
      });
      await user.save();
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

---

## 🔒 Security Features

### **1. Password Security**

**Bcrypt Hashing**:
```javascript
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```

**Password Requirements**:
- Minimum 6 characters
- Strength indicator with 6 levels
- Real-time validation feedback

### **2. JWT Security**

**Token Configuration**:
```javascript
const token = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

**Token Validation**:
- Verify token on every protected route
- Check token expiration
- Extract user information for authorization

### **3. Input Validation**

**Frontend Validation**:
- Real-time field validation
- Format checking (email, phone)
- Required field validation
- Password strength assessment

**Backend Validation**:
- Schema validation with Mongoose
- Sanitization of inputs
- Duplicate checking (email, phone)
- Format validation

### **4. Error Handling**

**Generic Login Messages**:
```javascript
// Always return generic message for security
return res.status(401).json({ 
  message: 'Invalid email or password' 
});
```

**Validation Errors**:
```javascript
return res.status(400).json({ 
  message: 'Please enter a valid email address' 
});
```

---

## ✅ Validation System

### **1. Email Validation**

**Regex Pattern**:
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

**Validation Rules**:
- Required field
- Valid email format
- Unique across collection

### **2. Mobile Number Validation**

**Regex Pattern**:
```javascript
const phoneRegex = /^[0-9]{10,15}$/;
```

**Validation Rules**:
- Required field
- 10-15 digits only
- Auto-filter non-digit characters
- Unique across User and Agency collections

**Auto-filtering Implementation**:
```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === 'contactNumber') {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [name]: digitsOnly }));
  }
};
```

### **3. Password Strength Validation**

**Strength Criteria**:
- Length (6+ characters, 10+ for stronger)
- Lowercase letters
- Uppercase letters
- Numbers
- Special characters

**Strength Levels**:
1. Very Weak (0-1 criteria)
2. Weak (2 criteria)
3. Fair (3 criteria)
4. Good (4 criteria)
5. Strong (5 criteria)
6. Very Strong (all criteria + length)

---

## 🚨 Error Handling

### **1. Frontend Error Handling**

**Form Validation Errors**:
```javascript
const [fieldErrors, setFieldErrors] = useState({});

const shouldShowError = (fieldName) => {
  return fieldErrors[fieldName] && formData[fieldName];
};
```

**API Error Handling**:
```javascript
try {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    setError(data.message || 'Login failed');
    return;
  }
  
  // Success handling
} catch (error) {
  setError('Network error. Please try again.');
}
```

### **2. Backend Error Handling**

**Validation Errors**:
```javascript
try {
  // Validation logic
} catch (error) {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.errors
    });
  }
  
  if (error.code === 11000) {
    return res.status(400).json({
      message: 'Email or mobile number already exists'
    });
  }
  
  res.status(500).json({ message: 'Server error' });
}
```

**Authentication Errors**:
```javascript
// Generic error for security
res.status(401).json({ 
  message: 'Invalid email or password' 
});

// Specific errors for development
if (process.env.NODE_ENV === 'development') {
  console.error('Auth error:', error);
}
```

---

## 🧪 Testing Guide

### **1. Manual Testing Checklist**

#### **Registration Testing**:
- [ ] Valid user registration → Success
- [ ] Duplicate email → Error message
- [ ] Weak password → Strength indicator
- [ ] Invalid email format → Real-time error
- [ ] Invalid mobile format → Real-time error
- [ ] Password mismatch → Real-time error

#### **Login Testing**:
- [ ] Valid credentials → Success
- [ ] Invalid credentials → Generic error
- [ ] Invalid email format → Real-time error
- [ ] Empty fields → Validation errors

#### **OAuth Testing**:
- [ ] Google user signup → Profile completion
- [ ] Google agency signup → Approval flow
- [ ] Existing Google user → Direct login
- [ ] OAuth cancel → Return to login

#### **Password Reset Testing**:
- [ ] Valid email → Reset email sent
- [ ] Invalid email → Error message
- [ ] Valid token → Reset form
- [ ] Invalid token → Error message
- [ ] Password confirmation → Validation

### **2. Automated Testing**

**Endpoint Testing Script**:
```bash
node test-auth-endpoints.js
```

**Test Cases**:
```javascript
const testCases = [
  {
    name: 'User Registration',
    endpoint: '/api/auth/register/user',
    method: 'POST',
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      contactNumber: '1234567890'
    }
  },
  // More test cases...
];
```

### **3. Security Testing**

**Input Validation**:
- SQL injection attempts
- XSS attempts
- Email enumeration
- Brute force protection

**Token Security**:
- JWT token expiration
- Token manipulation
- Authorization bypass
- Session management

---

## 🔧 Troubleshooting

### **Common Issues & Solutions**

#### **1. JWT Token Issues**

**Problem**: Token not working
**Solutions**:
```javascript
// Check token format
const token = req.header('Authorization')?.replace('Bearer ', '');

// Verify token
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
} catch (error) {
  console.error('JWT Error:', error.message);
}
```

#### **2. Google OAuth Issues**

**Problem**: OAuth callback failing
**Solutions**:
```javascript
// Check redirect URI configuration
const redirectUri = 'http://localhost:3000/auth/google/callback';

// Verify client ID and secret
// Check environment variables (never log actual secrets)
if (process.env.NODE_ENV === 'development') {
  console.log('Google OAuth configured:', !!process.env.GOOGLE_CLIENT_ID);
}
```

#### **3. Validation Issues**

**Problem**: Mobile number validation failing
**Solutions**:
```javascript
// Check regex pattern
const phoneRegex = /^[0-9]{10,15}$/;
console.log('Phone validation:', phoneRegex.test('1234567890'));

// Check auto-filtering
const digitsOnly = value.replace(/[^0-9]/g, '');
console.log('Filtered value:', digitsOnly);
```

#### **4. Database Connection Issues**

**Problem**: MongoDB connection failing
**Solutions**:
```javascript
// Check connection string
const mongoURI = process.env.MONGODB_URI;

// Test connection
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));
```

### **Debug Mode**

**Enable Debug Logging**:
```javascript
// Backend
if (process.env.NODE_ENV === 'development') {
  console.log('Auth Debug:', { user, token, role });
}

// Frontend
if (process.env.NODE_ENV === 'development') {
  console.log('Form Data:', formData);
  console.log('Validation Errors:', fieldErrors);
}
```

---

## 📚 Additional Resources

### **Security Best Practices**
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT Best Practices](https://auth0.com/blog/json-web-token-best-practices/)
- [OAuth 2.0 Security Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)

### **Testing Resources**
- [Postman API Testing](https://www.postman.com/api-testing/)
- [Jest Testing Framework](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### **Documentation**
- [Mongoose Validation](https://mongoosejs.com/docs/validation.html)
- [React Context API](https://reactjs.org/docs/context.html)
- [Express.js Middleware](https://expressjs.com/en/guide/using-middleware.html)

---

## 🎯 Quick Reference

### **Environment Variables**
```env
# Backend
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:3000
```

### **API Endpoints**
```
POST /api/auth/register/user      # User registration
POST /api/auth/register/agency    # Agency registration
POST /api/auth/login/user         # User login
POST /api/auth/login/agency       # Agency login
POST /api/auth/forgot-password   # Password reset request
POST /api/auth/reset-password     # Password reset confirmation
GET  /api/auth/google             # Google OAuth initiation
GET  /api/auth/google/callback    # Google OAuth callback
```

### **Frontend Routes**
```
/auth/register/user               # User registration page
/auth/register/agency             # Agency registration page
/auth/login/user                  # User login page
/auth/login/agency               # Agency login page
/auth/forgot-password            # Forgot password page
/auth/reset-password/:token      # Reset password page
/auth/complete-user-profile      # User profile completion
/auth/complete-agency-profile    # Agency profile completion
```

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Maintainer**: Sathish0416
