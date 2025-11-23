import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

const CompleteUserDetails = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    dateOfBirth: '',
    nationality: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'contactNumber':
        if (!value.trim()) return 'Contact number is required';
        if (!/^[0-9]{10,15}$/.test(value)) return 'Mobile number must be 10-15 digits long';
        return '';
      default:
        return '';
    }
  };

  const shouldShowError = (fieldName) => {
    return fieldErrors[fieldName] && formData[fieldName];
  };

  const getInputClasses = (fieldName) => {
    const baseClasses = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";
    const errorClasses = shouldShowError(fieldName) ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 text-gray-900 placeholder-gray-400";
    return `${baseClasses} ${errorClasses}`;
  };

  useEffect(() => {
    // Get user data from multiple sources
    const userData = user || JSON.parse(localStorage.getItem('user') || '{}');
    console.log('CompleteUserDetails - User data:', userData);
    
    if (userData && userData.email) {
      setFormData(prev => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || '',
        contactNumber: userData.contactNumber || '',
        dateOfBirth: userData.dateOfBirth || '',
        nationality: userData.nationality || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For contact number, only allow digits
    if (name === 'contactNumber') {
      const digitsOnly = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly
      }));
      
      // Real-time validation
      const error = validateField(name, digitsOnly);
      setFieldErrors(prev => ({
        ...prev,
        [name]: error
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Real-time validation for other fields
      const error = validateField(name, value);
      setFieldErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const fields = ['name', 'contactNumber'];
    const errors = {};
    fields.forEach((field) => {
      const message = validateField(field, formData[field]);
      if (message) {
        errors[field] = message;
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate form before submission
    const isValid = validateForm();
    if (!isValid) {
      setError('Please fix the validation errors before submitting.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/user/complete-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Update user data in context
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to home page directly
        navigate('/home');
        
        // Optional: Reload to update auth context after navigation
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isScrolled={true} />
      <div className="pt-24 max-w-2xl mx-auto px-4 pb-12">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Traveler Profile
            </h1>
            <p className="text-gray-600">
              Welcome! Please provide a few more details to complete your profile.
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  className={getInputClasses('name')}
                  placeholder="Enter your full name"
                  aria-invalid={shouldShowError('name')}
                />
                {shouldShowError('name') && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700"
                  placeholder="your.email@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed (from Google)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className={getInputClasses('contactNumber')}
                  placeholder="+1234567890"
                  aria-invalid={shouldShowError('contactNumber')}
                />
                {shouldShowError('contactNumber') && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.contactNumber}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Enter 10-15 digits (numbers only)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Indian, American, etc."
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteUserDetails;
