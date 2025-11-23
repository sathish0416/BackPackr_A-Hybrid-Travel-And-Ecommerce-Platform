import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import heroImg from '../../assets/eiffel-tower2.webp';
import { useAuth } from '../../context/AuthContext';

// Footer copied from traveler auth pages
const Footer = () => (
  <footer className="w-full bg-neutral-900 text-gray-200 py-10 px-4 mt-12">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-white">Contact</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-blue-400 transition">Email: contact@backpackr.com</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Phone: +1-234-567-890</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Address: 123 Main St, City, Country</a></li>
        </ul>
      </div>
      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-white">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
          <li><a href="#" className="hover:text-blue-400 transition">Help</a></li>
        </ul>
      </div>
      {/* Social Media */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-white">Follow Us</h3>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="hover:text-blue-400 transition" aria-label="Twitter">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.697a4.48 4.48 0 001.963-2.475 8.94 8.94 0 01-2.828 1.082A4.48 4.48 0 0016.11 4c-2.48 0-4.49 2.01-4.49 4.49 0 .352.04.695.116 1.022C7.728 9.36 4.1 7.6 1.67 4.98a4.48 4.48 0 00-.61 2.26c0 1.56.795 2.94 2.01 3.75a4.48 4.48 0 01-2.034-.563v.057c0 2.18 1.55 4 3.6 4.42a4.48 4.48 0 01-2.03.077c.57 1.78 2.23 3.08 4.2 3.12A8.98 8.98 0 012 19.54a12.7 12.7 0 006.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.18 9.18 0 0024 4.59a8.93 8.93 0 01-2.54.697z"/></svg>
          </a>
          <a href="#" className="hover:text-pink-500 transition" aria-label="Instagram">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm5.5.75a1 1 0 110 2 1 1 0 010-2z"/></svg>
          </a>
          <a href="#" className="hover:text-blue-600 transition" aria-label="Facebook">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <a href="#" className="hover:text-red-600 transition" aria-label="YouTube">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.75 2.75 0 00-1.94-1.94C18.2 6 12 6 12 6s-6.2 0-7.86.06a2.75 2.75 0 00-1.94 1.94A28.7 28.7 0 002 12a28.7 28.7 0 00.2 3.999 2.75 2.75 0 001.94 1.94C5.8 18 12 18 12 18s6.2 0 7.86-.06a2.75 2.75 0 001.94-1.94A28.7 28.7 0 0022 12a28.7 28.7 0 00-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
          </a>
        </div>
      </div>
      {/* Subscribe */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-white">Subscribe</h3>
        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Your email address"
            className="px-3 py-2 rounded bg-neutral-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-2">Get the latest updates and offers.</p>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 mt-10">&copy; {new Date().getFullYear()} Backpackr. All rights reserved.</div>
  </footer>
);

const LoginAgency = () => {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        return '';
      default:
        return '';
    }
  };

  const shouldShowError = (fieldName) => {
    return fieldErrors[fieldName] && formData[fieldName];
  };

  const getInputClasses = (fieldName) => {
    const baseClasses = "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";
    const errorClasses = shouldShowError(fieldName) ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500" : "";
    return `${baseClasses} ${errorClasses}`;
  };

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user?.role === 'agency') {
      if (user?.isApproved === false || user?.status === 'pending') {
        navigate('/auth/agency/pending-approval');
      } else {
        navigate('/agency/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/google?userType=agency');
      const data = await response.json();
      
      if (data.authUrl) {
        // Redirect to Google OAuth
        window.location.href = data.authUrl;
      } else {
        alert('Failed to initiate Google sign-in');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert('Failed to connect to Google sign-in');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);
    
    if (emailError || passwordError) {
      setFieldErrors({
        email: emailError,
        password: passwordError
      });
      setError('Please fix the validation errors before logging in.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await login(formData.email, formData.password, 'agency');

      if (result.redirectTo) {
        navigate(result.redirectTo);
        return;
      }

      if (!result.success) {
        setError(result.error || 'Unable to sign in. Please check your email and password and try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to our servers. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="w-full px-6 py-4 flex items-center justify-between bg-transparent absolute top-0 left-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎒</span>
          <span className="text-xl font-bold text-white">Backpackr</span>
        </div>
      </header>

      <main className="relative flex-grow h-screen">
        <div className="w-full h-screen overflow-hidden relative">
          <img
            src={heroImg}
            alt="Iconic city skyline with Eiffel Tower"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="absolute inset-0 hidden md:flex flex-col justify-end pl-10 pb-10 text-left max-w-md">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-3">BACKPACKR FOR AGENCIES</p>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
              Grow your travel business.
            </h1>
            <p className="text-sm text-gray-200">
              Sign in to manage inquiries, itineraries, and bookings from travelers who are ready
              to explore with you.
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-16">
            <div className="w-full max-w-md bg-white/90 border border-gray-100 shadow-xl rounded-2xl p-8 md:p-10">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Agency Sign In
                  </h2>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
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

                <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                  <div className="rounded-md shadow-sm space-y-4">
                    <div>
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={getInputClasses('email')}
                        placeholder="agency@example.com"
                        aria-invalid={shouldShowError('email')}
                      />
                      {shouldShowError('email') && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className={getInputClasses('password') + " pr-10"}
                          placeholder="••••••••"
                          aria-invalid={shouldShowError('password')}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {shouldShowError('password') && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link to="/forgot-password/agency" className="font-medium text-green-600 hover:text-green-500">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                  </div>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                  Don't have an agency account?{' '}
                  <button
                    onClick={() => navigate('/auth/register/agency')}
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Register here
                  </button>
                </div>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-green-50 text-green-700 rounded-full font-medium">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Google</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
  <path fill="#EA4335" d="M24 9.5c3.3 0 6 1.1 8.3 3l6.2-6.2C34.6 2.2 29.7 0 24 0 14.6 0 6.5 5.8 2.6 14.2l7.3 5.6C12.4 13 17.6 9.5 24 9.5z"/>
  <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.6c-.5 2.9-2 5.3-4.3 6.9l6.7 5.3c3.9-3.6 6.1-8.9 6.1-15.2z"/>
  <path fill="#FBBC05" d="M9.9 28.1c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.3-5.6C1.4 16.1 0 19.9 0 24s1.4 7.9 2.6 10.6l7.3-5.6z"/>
  <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16.1-5.7l-6.7-5.3c-2 1.4-4.5 2.2-7.3 2.2-6.3 0-11.6-4.2-13.5-10l-7.3 5.6C6.5 42.2 14.6 48 24 48z"/>
  <path fill="none" d="M0 0h48v48H0z"/>
</svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Spacer so footer shows only after scroll */}
      <div style={{ height: '300px' }}></div>

      <Footer />
    </div>
  );
};

export default LoginAgency;
