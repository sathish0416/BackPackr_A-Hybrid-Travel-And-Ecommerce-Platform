import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user, logout } = useAuth();

  const initial = (user?.name || user?.email || '?').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isScrolled={true} />
      <div className="pt-24 max-w-3xl mx-auto px-4">
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-lg">
              {initial}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.name || user?.email?.split('@')[0] || 'Traveler'}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
