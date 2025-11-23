import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AlpineImg from "../assets/itineraries/Alpine.jpg";
import EiffelTowerImg from "../assets/eiffel-tower2.webp";
import BaliImg from "../assets/itineraries/Bali.jpg";
import LehLadakhImg from "../assets/itineraries/leh-ladakh.jpg";
import MunnarImg from "../assets/itineraries/Munnar.jpg";
import ManaliImg from "../assets/itineraries/manali.jpg";
import GoaImg from "../assets/itineraries/goa.jpg";
import JaipurImg from "../assets/itineraries/jaipur.jpg";
import DubaiImg from "../assets/itineraries/dubai.jpg";
import CoorgImg from "../assets/itineraries/coorg.webp";
import RishikeshImg from "../assets/itineraries/Rishikesh.webp";
import VaranasiImg from "../assets/itineraries/varanasi.jpg";
import PondicherryImg from "../assets/itineraries/pondicherry.jpg";
import { useNavigate } from "react-router-dom";

const itineraries = [
  {
    id: 1,
    image: AlpineImg,
    name: "Alpine Escape",
    days: 7,
    rating: 4.8,
    overview: "Explore the Swiss Alps with breathtaking hikes, cozy lodges, and scenic train rides.",
    price: 1800,
  },
  {
    id: 2,
    image: BaliImg,
    name: "Bali Bliss",
    days: 5,
    rating: 4.7,
    overview: "Discover Bali’s beaches, temples, and rice terraces in this tropical adventure.",
    price: 1200,
  },
  {
    id: 3,
    image: LehLadakhImg,
    name: "Leh-Ladakh Adventure",
    days: 8,
    rating: 4.9,
    overview: "Journey through the rugged terrains of Leh-Ladakh, experience high-altitude passes, monasteries, and breathtaking landscapes.",
    price: 900,
  },
  {
    id: 4,
    image: MunnarImg,
    name: "Munnar Escape",
    days: 6,
    rating: 4.6,
    overview: "Relax in the lush green hills of Munnar, Kerala, with tea gardens, waterfalls, and serene mountain air.",
    price: 700,
  },
  {
    id: 5,
    image: ManaliImg,
    name: "Manali Retreat",
    days: 5,
    rating: 4.7,
    overview: "Experience the beauty of Manali with snow-capped mountains, adventure sports, and vibrant culture.",
    price: 800,
  },
  {
    id: 6,
    image: GoaImg,
    name: "Goa Getaway",
    days: 4,
    rating: 4.5,
    overview: "Enjoy the sun, sand, and sea in Goa with its lively beaches, nightlife, and Portuguese heritage.",
    price: 950,
  },
  {
    id: 7,
    image: JaipurImg,
    name: "Jaipur Heritage Tour",
    days: 3,
    rating: 4.4,
    overview: "Explore the Pink City’s palaces, forts, and vibrant bazaars in a royal experience.",
    price: 600,
  },
  {
    id: 8,
    image: DubaiImg,
    name: "Dubai Explorer",
    days: 6,
    rating: 4.8,
    overview: "Discover Dubai’s futuristic skyline, luxury shopping, desert safaris, and cultural gems.",
    price: 2000,
  },
  {
    id: 9,
    image: CoorgImg,
    name: "Coorg Coffee Trails",
    days: 4,
    rating: 4.6,
    overview: "Wander through lush coffee plantations, waterfalls, and hills in the Scotland of India.",
    price: 750,
  },
  {
    id: 10,
    image: RishikeshImg,
    name: "Rishikesh Adventure",
    days: 5,
    rating: 4.7,
    overview: "Experience yoga, river rafting, and spiritual bliss on the banks of the Ganges in Rishikesh.",
    price: 650,
  },
  {
    id: 11,
    image: VaranasiImg,
    name: "Varanasi Spiritual Sojourn",
    days: 3,
    rating: 4.3,
    overview: "Experience the spiritual heart of India with serene Ganga aartis, ancient temples, and bustling local markets.",
    price: 400,
  },
  {
    id: 12,
    image: PondicherryImg,
    name: "Pondicherry Coastal Retreat",
    days: 4,
    rating: 4.4,
    overview: "Relax by the sea, stroll through French quarters, and enjoy the unique blend of Indian and French culture.",
    price: 450,
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

const budgetOptions = ["Any", "Low", "Medium", "High"];
// Removed destinationOptions

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

const Trips = () => {
  const [budget, setBudget] = React.useState("Any");
  const [search, setSearch] = React.useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // 60vh hero section height
      setIsScrolled(window.scrollY > window.innerHeight * 0.6 - 64);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtering logic (simple for now)
  const filteredItineraries = itineraries.filter(item => {
    const matchesBudget = budget === "Any" || (budget === "Low" && item.price <= 500) || (budget === "Medium" && item.price > 500 && item.price <= 1500) || (budget === "High" && item.price > 1500);
    const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    return matchesBudget && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar isScrolled={isScrolled} />
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center" style={{ backgroundImage: `url(${EiffelTowerImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Explore Trips</h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow">Find your next adventure from our curated itineraries around the world.</p>
          {/* Search Bar */}
          <form className="flex flex-col md:flex-row gap-4 bg-white/90 rounded-lg p-4 shadow-lg w-full max-w-2xl mx-auto items-center justify-center" onSubmit={e => { e.preventDefault(); }}>
            <select value={budget} onChange={e => setBudget(e.target.value)} className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px]">
              {budgetOptions.map(opt => <option key={opt} value={opt}>{opt} Budget</option>)}
            </select>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search destination..." className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-[220px]" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition min-w-[100px]">Search</button>
          </form>
        </div>
      </section>
      {/* Trips Grid */}
      <section className="w-full bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">All Adventures</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {(budget === "Any" ? filteredItineraries : filteredItineraries.slice(0, 12)).map((item) => (
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
                  <div className="flex gap-2 mt-auto">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">Book Now</button>
                    <button onClick={() => navigate(`/trip-details/${item.id}`)} className="bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold py-2 px-4 rounded transition">See Itineraries</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Trips; 