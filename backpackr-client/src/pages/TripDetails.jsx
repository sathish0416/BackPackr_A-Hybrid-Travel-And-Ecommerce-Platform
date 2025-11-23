import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tripsData } from "../tripData";
import { useCart } from "../CartContext";

const TopNavbar = ({ isScrolled, cartCount, userName }) => {
  const navigate = useNavigate();
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => navigate("/home")}
          className={`text-lg font-medium transition-colors ${
            isScrolled
              ? "text-blue-700 hover:text-blue-900"
              : "text-white hover:text-blue-200"
          }`}
        >
          ← Back to Home
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/cart")}
            className="relative bg-white/80 hover:bg-gray-100 p-2 rounded-full text-blue-700"
          >
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            <span>👤</span>
            <span className="font-semibold">Sample User</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const TripDetails = () => {
  const { tripId } = useParams();
  const [filteredDays, setFilteredDays] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems, addToCart } = useCart();
  const cartCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.5 - 64);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trip = tripsData[tripId] || tripsData[1]; // fallback to Alpine if not found
  const filteredItineraries = filteredDays
    ? trip.itineraries.filter((it) => it.days === Number(filteredDays))
    : trip.itineraries;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar
        isScrolled={isScrolled}
        cartCount={cartCount}
        userName={"Sample User"}
      />
      {/* Hero Section */}
      <section
        className="relative w-full h-[50vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${trip.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            {trip.name} Expedition
          </h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/90 p-4 rounded-lg shadow-lg max-w-xl mx-auto"
          >
            <input
              type="number"
              min="1"
              value={filteredDays}
              onChange={(e) => setFilteredDays(e.target.value)}
              placeholder="Search by days"
              className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Trip Overview */}
      <section className="bg-white py-12 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">
              🏝️ {trip.name}
            </h2>
            <p className="text-gray-600 mb-2">
              {trip.overview.days} | ★ {trip.overview.rating}
            </p>
            <p className="text-gray-700">{trip.overview.desc}</p>
          </div>
          <div className="flex-1">
            <img
              src={trip.overviewImg}
              alt="Overview"
              className="w-full h-60 object-cover rounded-xl shadow-lg border"
            />
          </div>
        </div>
      </section>

      {/* Itinerary Cards */}
      <section className="py-12 px-4">
        {filteredItineraries.map((itinerary) => (
          <div
            key={itinerary.id}
            className="bg-white rounded-xl shadow-md mb-10 p-8 max-w-5xl mx-auto min-h-[520px]"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-1 text-center">
              {itinerary.title}
            </h3>
            <div className="flex justify-center gap-4 text-gray-600 text-sm mb-3">
              <span>{itinerary.days} days</span>
              <span>★ {itinerary.rating}</span>
              <span className="text-green-700 font-semibold">
                ${itinerary.price}
              </span>
            </div>
            <ul className="list-disc list-inside text-gray-600 mb-3 max-w-md mx-auto text-left">
              {itinerary.highlights.slice(0, 3).map((hl, idx) => (
                <li key={idx}>{hl}</li>
              ))}
            </ul>
            <p className="italic text-gray-500 text-center mb-4">
              {itinerary.sample}
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => addToCart({ tripId: Number(tripId), itineraryId: itinerary.id })}
                className="bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold px-4 py-2 rounded"
              >
                Add to Cart
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">
                Buy Now
              </button>
            </div>
            {/* Gallery */}
            <h4 className="text-center text-gray-700 font-semibold mb-2">
              Gallery
            </h4>
            <div className="flex justify-between gap-2 mb-1">
              {itinerary.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Gallery"
                  className="w-1/3 h-40 object-cover rounded-lg border"
                />
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-1">
              Unlock full itinerary after purchase!
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TripDetails;
