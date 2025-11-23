import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import Trips from './pages/Trips';
import TripDetails from './pages/TripDetails';
import Cart from './pages/Cart';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import RoleSelection from './pages/auth/RoleSelection';
import LoginUser from './pages/auth/LoginUser';
import LoginAgency from './pages/auth/LoginAgency';
import RegisterUser from './pages/auth/RegisterUser';
import RegisterAgency from './pages/auth/RegisterAgency';
import PendingApproval from './pages/auth/PendingApproval';
import ForgotPassword from './pages/auth/ForgotPassword';
import ForgotPasswordAgency from './pages/auth/ForgotPasswordAgency';
import ResetPassword from './pages/auth/ResetPassword';
import AuthCallback from './pages/auth/AuthCallback';
import CompleteUserDetails from './pages/auth/CompleteUserDetails';
import CompleteAgencyDetails from './pages/auth/CompleteAgencyDetails';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/role" />;
  }

  // Only check for unapproved agencies on agency-specific routes
  if (requiredRole === 'agency' && user.role === 'agency' && user.isApproved === false) {
    return <Navigate to="/auth/login/agency" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// Dashboard placeholders
const UserDashboard = () => <div className="min-h-screen pt-20">User Dashboard</div>;
const AgencyDashboard = () => <div className="min-h-screen pt-20">Agency Dashboard</div>;

// Home component with authentication check
const HomeWithAuthCheck = () => {
  // Always show the home page, let the Navbar handle the authentication display
  return <Home />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<HomeWithAuthCheck />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/trip-details/:tripId" element={<TripDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/blog" element={<Blog />} />

      {/* Auth Routes */}
      <Route path="/auth/role" element={<RoleSelection />} />
      <Route path="/auth/login/user" element={<LoginUser />} />
      <Route path="/auth/login/agency" element={<LoginAgency />} />
      <Route path="/auth/register/user" element={<RegisterUser />} />
      <Route path="/auth/register/agency" element={<RegisterAgency />} />
      <Route path="/auth/agency/pending-approval" element={<PendingApproval />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password/agency" element={<ForgotPasswordAgency />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/auth/complete-user-details" element={<CompleteUserDetails />} />
      <Route path="/auth/complete-agency-details" element={<CompleteAgencyDetails />} />

      {/* Protected Routes */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user/dashboard" 
        element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/agency/dashboard" 
        element={
          <ProtectedRoute requiredRole="agency">
            <AgencyDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
