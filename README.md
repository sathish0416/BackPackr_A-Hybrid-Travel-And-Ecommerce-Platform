# Backpackr - Hybrid Travel & Ecommerce Platform

A modern, full-featured travel marketplace built with MERN stack where users can browse travel gear, download itineraries, book real trips from agencies, and get AI-powered recommendations.

---

## 🌍 Project Overview
Backpackr is a comprehensive travel ecosystem featuring:
- **Travel Gear Marketplace**: Purchase essential travel equipment
- **Static Itineraries**: Download expertly crafted travel plans
- **Real Trip Bookings**: Book actual trips from verified travel agencies
- **AI Recommendations**: Get personalized travel suggestions
- **Multi-Role System**: Users, Travel Agencies, and Admins

---

## ✨ Key Features

### 🔐 **Advanced Authentication System**
- **JWT-based Authentication** with role-based access control
- **Google OAuth Integration** for seamless signup/login
- **Multi-Role Support**: Users, Travel Agencies, and Admins
- **Real-time Form Validation** with visual feedback
- **Password Strength Indicators** with color-coded meters
- **Password Visibility Toggles** on all password fields
- **Mobile Number Validation** (10-15 digits) with uniqueness checks
- **Secure Password Reset** with token-based system
- **Profile Completion** flows for OAuth users

### 🛍️ **Ecommerce Features**
- **Product Catalog**: Travel gear with categories and search
- **Shopping Cart**: Add/remove items with persistent state
- **Trip Bookings**: Real-world trip reservations from agencies
- **Itinerary Downloads**: Static travel guides and plans
- **Payment Integration**: Razorpay (Test/Live modes)

### 👥 **User Management**
- **User Dashboard**: View bookings, purchases, and profile
- **Agency Dashboard**: Manage trips, bookings, and profile
- **Admin Panel**: Approve agencies, manage platform
- **Profile Management**: Complete user and agency profiles

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** with modern hooks and patterns
- **React Router** for client-side routing
- **Tailwind CSS** for responsive design
- **Context API** for state management
- **Axios** for API communication
- **React Icons** for UI components

### **Backend**
- **Node.js + Express.js** for REST API
- **MongoDB Atlas** for cloud database
- **Mongoose** for ODM and schema validation
- **JWT** for authentication tokens
- **Bcrypt** for password hashing
- **Multer + Cloudinary** for file uploads

### **Authentication & Security**
- **JWT Authentication** with role-based guards
- **Google OAuth 2.0** integration
- **Password Strength Validation**
- **Input Sanitization** and validation
- **CORS** configuration
- **Helmet.js** for security headers

### **Additional Services**
- **Nodemailer** for email notifications
- **html-pdf** for invoice generation
- **Razorpay** for payment processing
- **Cloudinary** for media storage

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB Atlas account
- Google OAuth credentials
- Razorpay account (for payments)

### **1. Clone the Repository**
```bash
git clone https://github.com/sathish0416/BackPackr_A-Hybrid-Travel-And-Ecommerce-Platform.git
cd BackPackr_A-Hybrid-Travel-And-Ecommerce-Platform
```

### **2. Backend Setup**
```bash
cd backpackr-server
npm install
cp .env.example .env
# Configure .env with your credentials
npm run dev
```

### **3. Frontend Setup**
```bash
cd ../backpackr-client
npm install
npm run dev
```

### **4. Environment Configuration**

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_HOST=your_email_host
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

---

## 📁 Project Structure
```
Backpackr/
├── backpackr-client/          # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/          # React Context (Auth, Cart)
│   │   ├── pages/            # Page components
│   │   │   ├── auth/         # Authentication pages
│   │   │   ├── home/         # Home and landing pages
│   │   │   ├── trips/        # Trip-related pages
│   │   │   └── profile/      # User profile pages
│   │   ├── services/         # API services
│   │   └── utils/            # Helper functions
│   └── package.json
├── backpackr-server/          # Node.js Backend
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── config/              # Database configuration
│   └── package.json
└── README.md
```

---

## � Authentication Flow

### **User Registration & Login**
1. **Email/Password Registration**: Real-time validation, password strength indicators
2. **Google OAuth**: Seamless signup with profile completion
3. **Role Assignment**: Automatic role detection during registration
4. **JWT Tokens**: Secure token-based authentication

### **Agency Registration & Approval**
1. **Agency Registration**: Additional business information required
2. **Admin Approval**: Manual verification process
3. **Pending State**: Agencies wait for approval before full access
4. **Profile Completion**: Additional details after OAuth signup

### **Security Features**
- **Password Strength**: Visual indicators with 6 strength levels
- **Mobile Validation**: 10-15 digit format with uniqueness checks
- **Input Sanitization**: Real-time validation on all forms
- **Generic Error Messages**: Security-focused login responses
- **Token Management**: Secure JWT handling and expiration

---

## 📚 API Endpoints

### **Authentication**
- `POST /api/auth/register/user` - User registration
- `POST /api/auth/register/agency` - Agency registration
- `POST /api/auth/login/user` - User login
- `POST /api/auth/login/agency` - Agency login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation
- `GET /api/auth/google` - Google OAuth initiation
- `GET /api/auth/google/callback` - Google OAuth callback

### **User Management**
- `PUT /api/auth/user/complete-profile` - Complete user profile
- `PUT /api/auth/agency/complete-profile` - Complete agency profile
- `GET /api/auth/user/profile` - Get user profile
- `GET /api/auth/agency/profile` - Get agency profile

---

## 🧪 Testing

### **Manual Testing Checklist**
- [ ] User registration and login flows
- [ ] Agency registration and approval process
- [ ] Google OAuth integration
- [ ] Password reset functionality
- [ ] Form validation and error handling
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### **Automated Testing**
```bash
# Run endpoint testing script
node test-auth-endpoints.js

# Test all authentication flows
npm run test:auth
```

---

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**
```bash
cd backpackr-client
npm run build
# Deploy dist/ folder to your hosting platform
```

### **Backend (Heroku/Railway)**
```bash
cd backpackr-server
npm install --production
# Deploy with environment variables configured
```

### **Database**
- **MongoDB Atlas**: Cloud-hosted MongoDB database
- **Collections**: Users, Agencies, Products, Trips, Bookings

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📣 Credits

- **Built by**: Sathish0416
- **Tech Stack**: MERN (MongoDB, Express, React, Node.js)
- **UI Framework**: Tailwind CSS
- **Authentication**: JWT + Google OAuth
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend), Railway (Backend)

---

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the [AUTHENTICATION.md](./AUTHENTICATION.md) for detailed auth documentation
- Review the API documentation in the code comments

---

**Happy Traveling! 🎒✈️**