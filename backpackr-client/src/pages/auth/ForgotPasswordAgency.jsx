import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import heroImg from '../../assets/eiffel-tower2.webp';

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

const ForgotPasswordAgency = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          userType: 'agency'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ email: '' });
      } else {
        setError(data.message || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError('Network error. Please try again.');
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
            alt="Adventurous traveler looking at mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 hidden md:flex flex-col justify-end pl-10 pb-10 text-left max-w-md">
            <p className="text-sm uppercase tracking-[0.3em] text-green-200 mb-3">BACKPACKR FOR AGENCIES</p>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
              Reset your agency password.
            </h1>
            <p className="text-sm text-gray-200">
              Enter your agency email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-16">
            <div className="w-full max-w-md bg-white/90 border border-gray-100 shadow-xl rounded-2xl p-8 md:p-10">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Agency Forgot Password
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

                {success && (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          Password reset link sent!
                        </h3>
                        <p className="mt-1 text-sm text-green-700">
                          Check your agency email for instructions to reset your password.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!success && (
                  <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                      <div>
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                          Agency Email address
                        </label>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="agency@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                      </button>
                    </div>
                  </form>
                )}

                <div className="mt-4 text-center text-sm text-gray-600">
                  <Link to="/auth/login/agency" className="font-medium text-green-600 hover:text-green-500">
                    Back to Agency Sign In
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

export default ForgotPasswordAgency;
