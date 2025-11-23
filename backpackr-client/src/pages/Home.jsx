import React, { useState, useEffect } from "react";
import heroImg from "../assets/hero2.jpeg";
import AlpineImg from "../assets/itineraries/Alpine.jpg";
import BaliImg from "../assets/itineraries/Bali.jpg";
import LehLadakhImg from "../assets/itineraries/leh-ladakh.jpg";
import MunnarImg from "../assets/itineraries/Munnar.jpg";
import BackpackImg from "../assets/travel-gear/backpack.avif";
import TentImg from "../assets/travel-gear/tent.jpeg";
import WaterBottleImg from "../assets/travel-gear/water_bottle.jpg";
import TravelKitImg from "../assets/travel-gear/travel-kit.jpg";
import WhyBackpackrVideo from "../assets/why_backpackr.mp4";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section 
        className="relative w-full h-[80vh] flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${heroImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                Empowering Explorers. One Trip at a Time.
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow">
                Discover breathtaking destinations, curated trip plans, and essential travel gear – all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate("/trips")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded shadow-lg text-lg transition">Explore Trips</button>
                <button className="bg-white/90 hover:bg-white text-blue-700 font-bold py-3 px-8 rounded shadow-lg text-lg transition">Visit Gear Shop</button>
            </div>
        </div>
    </section>
  );
};


const itineraries = [
  {
    id: 1,
    image: AlpineImg,
    name: "Alpine Escape",
    days: 7,
    rating: 4.8,
    overview: "Explore the Swiss Alps with breathtaking hikes, cozy lodges, and scenic train rides.",
  },
  {
    id: 2,
    image: BaliImg,
    name: "Bali Bliss",
    days: 5,
    rating: 4.7,
    overview: "Discover Bali’s beaches, temples, and rice terraces in this tropical adventure.",
  },
  {
    id: 3,
    image: LehLadakhImg,
    name: "Leh-Ladakh Adventure",
    days: 8,
    rating: 4.9,
    overview: "Journey through the rugged terrains of Leh-Ladakh, experience high-altitude passes, monasteries, and breathtaking landscapes.",
  },
  {
    id: 4,
    image: MunnarImg,
    name: "Munnar Escape",
    days: 6,
    rating: 4.6,
    overview: "Relax in the lush green hills of Munnar, Kerala, with tea gardens, waterfalls, and serene mountain air.",
  },
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <span className="text-yellow-400">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={i}>★</span>
        ))}
      {halfStar && <span>☆</span>}
    </span>
  );
};

const ItinerarySection = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">Popular Adventures</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {itineraries.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-blue-700 mb-1">{item.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="mr-2">{item.days} days</span>
                  <StarRating rating={item.rating} />
                  <span className="ml-2">{item.rating}</span>
                </div>
                <p className="text-gray-600 flex-1 mb-4">{item.overview}</p>
                <button onClick={() => navigate("/trips")}
                  className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">View More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const gearProducts = [
  {
    id: 1,
    image: BackpackImg,
    name: "Explorer Backpack",
    price: 89.99,
  },
  {
    id: 2,
    image: TentImg,
    name: "All-Weather Tent",
    price: 129.99,
  },
  {
    id: 3,
    image: WaterBottleImg,
    name: "Insulated Water Bottle",
    price: 24.99,
  },
  {
    id: 4,
    image: TravelKitImg,
    name: "Travel Organizer Set",
    price: 34.99,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    name: "Portable Power Bank",
    price: 39.99,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1462129487128-512a0e9150c7?auto=format&fit=crop&w=600&q=80",
    name: "Quick-Dry Towel",
    price: 19.99,
  },
];

const GearSection = () => (
  <section className="w-full bg-white py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">Essential Gear for Your Journey</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {gearProducts.slice(0, 4).map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden flex flex-col">
            <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{item.name}</h3>
              <div className="text-xl font-bold text-gray-800 mb-4">${item.price.toFixed(2)}</div>
              <button onClick={() => window.location.href='/gear-shop'} className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">View More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const missionFeatures = [
  {
    icon: "🤖",
    title: "AI-powered Planning",
    desc: "Let AI craft your perfect trip — smarter routes, better stays, and zero stress.",
    accent: "text-blue-400",
  },
  {
    icon: "🌱",
    title: "Budget & Eco-friendly",
    desc: "Explore more with less — travel smart without hurting the planet.",
    accent: "text-green-400",
  },
  {
    icon: "🎒",
    title: "Handpicked Gear & Guides",
    desc: "Only the best — curated gear and authentic guides, trusted by real travelers.",
    accent: "text-yellow-400",
  },
  {
    icon: "🫂",
    title: "Community & Sharing",
    desc: "Join a tribe — share itineraries, tips, and connect with fellow explorers.",
    accent: "text-pink-400",
  },
];

const MissionSection = () => (
  <section className="w-full py-20 px-4 bg-white">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
      {/* Left: Text Content */}
      <div className="flex-1">
        <h2 className="flex items-center gap-2 text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          <span role="img" aria-label="globe">🌍</span> Why Backpackr?
        </h2>
        <p className="text-lg text-gray-600 mb-8">Your ultimate travel partner, powered by smart tech and community spirit.</p>
        <div className="space-y-6">
          {missionFeatures.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <span className={`text-4xl mt-1 ${feature.accent}`}>{feature.icon}</span>
              <div>
                <h3 className="text-lg font-bold mb-1 text-blue-600">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right: Video */}
      <div className="flex-1 flex justify-center">
        <video
          src={WhyBackpackrVideo}
          className="w-[400px] md:w-[600px] rounded-2xl shadow-2xl border border-gray-200"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  </section>
);

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

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar isScrolled={isScrolled} />
      <HeroSection />
      <ItinerarySection />
      <GearSection />
      <MissionSection />
      <Footer />
    </div>
  );
};

export default Home;
