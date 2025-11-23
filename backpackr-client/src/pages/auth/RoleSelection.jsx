import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import heroImg from '../../assets/hero1.jpeg';

// Reuse the same footer design as Home page
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

const RoleSelection = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'user') {
        navigate('/home');
      } else if (user.role === 'agency') {
        if (user.isApproved === false || user.status === 'pending') {
          navigate('/auth/agency/pending-approval');
        } else {
          navigate('/agency/dashboard');
        }
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
   <div className="bg-white min-h-screen flex flex-col">
      {/* Simple header with logo and name */}
     <header className="w-full px-6 py-4 flex items-center justify-between bg-transparent absolute top-0 left-0 z-50">

        <div className="flex items-center gap-2">
          <span className="text-2xl">🎒</span>
          <span className="text-xl font-bold text-white">Backpackr</span>
        </div>
      </header>

      {/* Main content: hero image + role selection, fills remaining viewport height */}
     <main className="relative flex-grow h-screen">



        {/* Left: Hero image */}
    <div className="w-full h-screen overflow-hidden relative">




         <img
  src={heroImg}
  alt="Adventurous traveler looking at mountains"
  className="w-full h-full object-contain object-cover"
/>


          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-3">BACKPACKR</p>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white max-w-md mb-3">
              Choose your journey. We'll handle the rest.
            </h1>
            <p className="text-sm text-gray-200 max-w-md">
              Whether you are planning your first solo trip or scaling your travel business,
              Backpackr connects explorers and expert agencies on a single, powerful platform.
            </p>
          </div>
        </div>
                           
        {/* Right: Role selection card */}
        <section className="absolute right-0 top-0 w-full md:w-[40%] h-full flex items-center justify-center px-4 py-12">



          <div className="w-full max-w-md bg-white/90 border border-gray-100 shadow-xl rounded-2xl p-8 md:p-10 scale-110">
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-blue-500 uppercase mb-2">WELCOME TO BACKPACKR</p>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Choose your role to continue</h2>
              <p className="text-sm text-gray-600">
                Tell us who you are so we can craft the perfect experience for you.
              </p>
            </div>

            

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/auth/login/user')}
                className="w-full flex items-center justify-between gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 px-4 rounded-xl text-base font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="flex flex-col items-start text-left">
                  <span>Traveler / Customer</span>
                  <span className="text-xs font-normal text-blue-100">
                    Discover trips, book experiences, and gear up for your next adventure.
                  </span>
                </span>
                <span className="text-xl">🚶‍♂️</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/auth/login/agency')}
                className="w-full flex items-center justify-between gap-3 bg-white border border-emerald-500 text-emerald-700 py-3.5 px-4 rounded-xl text-base font-semibold shadow-sm hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <span className="flex flex-col items-start text-left">
                  <span>Travel Agency</span>
                  <span className="text-xs font-normal text-emerald-700/80">
                    List your trips, reach new travelers, and manage bookings with ease.
                  </span>
                </span>
                <span className="text-xl">🏔️</span>
              </motion.button>
            </div>

            
          </div>
        </section>
      </main>

      {/* Footer */}
      <div style={{ height: "300px" }}></div>


      <Footer />
    </div>
  );
};

export default RoleSelection;
