import React, { useState } from "react";
import Navbar from "../components/Navbar";
import blogCard1 from "../assets/blog/blog_card1.jpg";
import blogCard2 from "../assets/blog/blog_card2.jpeg";
import blogCard3 from "../assets/blog/blog_card3.jpg";
import blogCardWeekend from "../assets/blog/blog_card_weekend.jpg";
import blogCard4 from "../assets/blog/blog_card4.jpeg";
import blogHero from "../assets/blog/blog_hero.avif";
import blogImageNormal from "../assets/blog/blog_image_normal.jpg";

// Footer component copied from Home.jsx
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

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Monsoon Treks in India",
    description: "Discover the most breathtaking monsoon treks across India, from lush forests to misty mountains.",
    coverImage: blogCard1,
    more: "Explore the Western Ghats, the Himalayas, and the lush valleys of the Northeast. Each trek offers unique flora, fauna, and monsoon magic. Don't forget your rain gear!",
    tags: ["Adventure", "Monsoon", "Trekking"],
  },
  {
    id: 2,
    title: "Solo Backpacking: Tips for First Timers",
    description: "Everything you need to know before your first solo backpacking adventure.",
    coverImage: blogCard2,
    more: "Plan your route, pack light, and always keep emergency contacts handy. Solo travel builds confidence and creates unforgettable memories.",
    tags: ["Solo Travel", "Tips"],
  },
  {
    id: 3,
    title: "Best Budget Gear for 2024",
    description: "Our top picks for affordable, reliable travel gear for every explorer.",
    coverImage: blogCard3,
    more: "From backpacks to water filters, we review the best value-for-money gear. Save money, travel farther!",
    tags: ["Gear", "Budget"],
  },
  {
    id: 4,
    title: "City Escapes: Weekend Getaways",
    description: "Quick escapes from the city for a refreshing weekend adventure.",
    coverImage: blogCardWeekend,
    more: "Find hidden gems just a few hours from your city. Perfect for a short recharge with friends or solo.",
    tags: ["City Escapes", "Weekend"],
  },
  {
    id: 5,
    title: "Ultimate Guide to Group Adventures",
    description: "How to plan, coordinate, and enjoy group trips without the stress.",
    coverImage: blogCard4,
    more: "Group dynamics can be tricky. Set clear expectations, share responsibilities, and make memories together!",
    tags: ["Adventure", "Group Travel"],
  },
];

const allTags = [
  "Adventure",
  "Monsoon",
  "Trekking",
  "Solo Travel",
  "Tips",
  "Gear",
  "Budget",
  "City Escapes",
  "Weekend",
  "Group Travel",
];

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [modalPost, setModalPost] = useState(null);

  const filteredPosts =
    selectedTag === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.tags.includes(selectedTag));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Navbar overlay */}
      <div className="relative w-full h-[40vh] flex items-center justify-center text-center overflow-hidden" style={{ backgroundImage: `url(${blogHero})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <Navbar isScrolled={false} />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 w-full flex flex-col items-center justify-center mt-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">Explore. Learn. Wander.</h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto drop-shadow">
            Get tips, destination guides, and gear reviews from seasoned travelers.
          </p>
        </div>
      </div>

      {/* Tag Filter */}
      <div className="max-w-6xl mx-auto px-4 mt-10 mb-6 flex flex-wrap gap-3 justify-center">
        <button
          className={`px-4 py-2 rounded-full font-semibold border transition ${selectedTag === "All" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"}`}
          onClick={() => setSelectedTag("All")}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-full font-semibold border transition ${selectedTag === tag ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <img src={post.coverImage} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{post.title}</h3>
                <p className="text-gray-600 flex-1 mb-4">{post.description}</p>
                <button onClick={() => setModalPost(post)} className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Read More Modal */}
      {modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative">
            <button className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-red-600" onClick={() => setModalPost(null)}>&times;</button>
            <img src={modalPost.coverImage} alt={modalPost.title} className="w-full h-48 object-cover rounded mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-blue-700">{modalPost.title}</h2>
            <p className="mb-4 text-gray-700">{modalPost.more}</p>
          </div>
        </div>
      )}

      {/* Ending Section with image and note */}
      <div className="max-w-4xl mx-auto px-4 pb-16 flex flex-col md:flex-row items-center gap-8 mt-10">
        <img src={blogImageNormal}
          alt="Travel inspiration" className="w-full md:w-1/2 rounded-xl shadow-lg object-cover" />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Keep Exploring, Keep Growing</h2>
          <p className="text-lg text-gray-700 mb-2">Travel is not just about the places you visit, but the stories you collect and the person you become along the way. Whether you're scaling mountains, wandering city streets, or sharing a campfire with new friends, every journey adds a new chapter to your story.</p>
          <p className="text-md text-gray-500">Ready for your next adventure? The world is waiting for you. 🌍</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog; 