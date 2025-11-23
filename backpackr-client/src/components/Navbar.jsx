import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ isScrolled }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAuth();
  
  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;
  
  // For agencies, only show them as logged in if they're approved
  const shouldShowProfile = isAuthenticated && 
    (user?.role !== 'agency' || user?.isApproved !== false);
  const isHome = location.pathname === "/home" || location.pathname === "/";
  const isTrips = location.pathname === "/trips";
  const isBlog = location.pathname === "/blog";

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎒</span>
          <span
            className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? "text-blue-700" : "text-white"
            }`}
          >
            Backpackr
          </span>
        </div>
        {/* Right Links */}
        <div className="flex items-center gap-6">
          <a href="#" onClick={() => navigate("/home")}
            className={`font-medium transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"} ${isHome ? 'underline text-blue-700 font-bold' : ''}`}>Home</a>
          <a href="#" onClick={() => navigate("/trips")}
            className={`font-medium transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"} ${isTrips ? 'underline text-blue-700 font-bold' : ''}`}>Trips</a>
          <a href="#" className={`font-medium transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"}`}>Gear Shop</a>
          <a href="#" onClick={() => navigate("/blog")}
            className={`font-medium transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"} ${isBlog ? 'underline text-blue-700 font-bold' : ''}`}>Blog</a>
          <a href="#" className={`font-medium transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"}`}>About</a>
          <a href="#" className={`font-medium transition-colors duration-300 ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-200"}`}>Contact</a>
          {shouldShowProfile ? (
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex items-center ml-4 focus:outline-none"
            >
              <span className={`font-medium ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                {(() => {
                  // For agencies, prioritize agencyName, for users, use name
                  if (user?.role === 'agency') {
                    return user?.agencyName || user?.name || user?.email?.split('@')[0];
                  } else {
                    return user?.name || user?.email?.split('@')[0];
                  }
                })()}
              </span>
              <div className="ml-2 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                {(() => {
                  // For agencies, use agencyName first, for users, use name first
                  if (user?.role === 'agency') {
                    return (user?.agencyName || user?.name || user?.email || '?').charAt(0).toUpperCase();
                  } else {
                    return (user?.name || user?.email || '?').charAt(0).toUpperCase();
                  }
                })()}
              </div>
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold ml-2 shadow-lg"
              onClick={() => navigate("/auth/role")}
            >
              Login / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;