import React, { useState } from 'react';
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

const RegisterAgency = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    agencyName: '',
    email: '',
    contactNumber: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({
    agencyName: false,
    email: false,
    contactNumber: false,
    address: false,
    password: false,
    confirmPassword: false
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const shouldShowError = (field) =>
    Boolean(fieldErrors[field]) && (touched[field] || hasSubmitted);

  const getInputClasses = (field, extraClasses = '') => `appearance-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 focus:z-10 sm:text-sm ${extraClasses} ${shouldShowError(field) ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}`;

  const validateField = (name, value) => {
    switch (name) {
      case 'agencyName':
        if (!value.trim()) return 'Agency name is required';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'contactNumber':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[0-9]{10,15}$/.test(value)) return 'Phone number must be 10-15 digits';
        return '';
      case 'address':
        if (!value.trim()) return 'Business address is required';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return "Passwords don't match";
        return '';
      default:
        return '';
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    
    // Length check
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

  const validateForm = () => {
    const fields = ['agencyName', 'email', 'contactNumber', 'address', 'password', 'confirmPassword'];
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name] || hasSubmitted) {
      const message = validateField(name, value);
      setFieldErrors(prev => ({
        ...prev,
        [name]: message
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const message = validateField(name, formData[name]);
    setFieldErrors(prev => ({
      ...prev,
      [name]: message
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setError('');

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      setLoading(true);
      const { confirmPassword, ...agencyData } = formData;

      const payload = {
        ...agencyData,
        contactNumber: formData.contactNumber,
        address: formData.address,
      };

      const result = await register(payload, 'agency');

      if (result.success) {
        navigate('/auth/agency/pending-approval');
      } else {
        setError(result.error || 'Registration failed. Please check your information and try again.');
      }
    } catch (err) {
      setError('Unable to create your agency account. Please check your internet connection and try again.');
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
              Partner with Backpackr.
            </h1>
            <p className="text-sm text-gray-200">
              Create your agency account to reach new travelers, showcase curated itineraries, and
              grow your business worldwide.
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-16">
            <div className="w-full max-w-lg bg-white/90 border border-gray-100 shadow-xl rounded-2xl p-2 md:p-3">
              <div className="space-y-2">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Register Your Travel Agency
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
                      <label htmlFor="agencyName" className="sr-only">
                        Agency Name
                      </label>
                      <input
                        id="agencyName"
                        name="agencyName"
                        type="text"
                        required
                        value={formData.agencyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses('agencyName', 'rounded-none rounded-t-md')}
                        placeholder="Agency Name"
                        aria-invalid={shouldShowError('agencyName')}
                      />
                      {shouldShowError('agencyName') && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.agencyName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses('email')}
                        placeholder="Email address"
                        aria-invalid={shouldShowError('email')}
                      />
                      {shouldShowError('email') && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contactNumber" className="sr-only">
                        Phone Number
                      </label>
                      <input
                        id="contactNumber"
                        name="contactNumber"
                        type="tel"
                        required
                        value={formData.contactNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses('contactNumber')}
                        placeholder="Phone Number"
                        aria-invalid={shouldShowError('contactNumber')}
                      />
                      {shouldShowError('contactNumber') && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.contactNumber}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="address" className="sr-only">
                        Business Address
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        rows={2}
                        required
                        value={formData.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getInputClasses('address')}
                        placeholder="Business Address"
                        aria-invalid={shouldShowError('address')}
                      />
                      {shouldShowError('address') && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.address}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={getInputClasses('password', 'pr-10')}
                          placeholder="Password"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {shouldShowError('password') && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                      )}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Password strength:</span>
                            <span className={`text-xs font-medium ${
                              getPasswordStrength(formData.password).strength >= 3 ? 'text-green-600' : 
                              getPasswordStrength(formData.password).strength >= 2 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {getPasswordStrength(formData.password).text}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrength(formData.password).color}`}
                              style={{ width: `${(getPasswordStrength(formData.password).strength / 5) * 100}%` }}
                            />
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            Use 6+ characters with mix of letters, numbers & symbols
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="sr-only">
                        Confirm Password
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          id="confirm-password"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={getInputClasses('confirmPassword', 'rounded-none rounded-b-md pr-10')}
                          placeholder="Confirm Password"
                          aria-invalid={shouldShowError('confirmPassword')}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {shouldShowError('confirmPassword') && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Your agency account will be reviewed by our admin team. You'll receive an email once your account is approved.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                      I agree to the <a href="#" className="text-green-600 hover:text-green-500">Terms</a> and <a href="#" className="text-green-600 hover:text-green-500">Privacy Policy</a>
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {loading ? 'Registering Agency...' : 'Register Agency'}
                    </button>
                  </div>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                  Already have an agency account?{' '}
                  <Link to="/auth/login/agency" className="font-medium text-green-600 hover:text-green-500">
                    Sign in
                  </Link>
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

export default RegisterAgency;
