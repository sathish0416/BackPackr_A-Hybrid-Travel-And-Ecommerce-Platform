import React from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import { tripsData } from "../tripData";

const CartNavbar = ({ cartCount }) => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => navigate("/trips")}
          className="text-lg font-medium text-blue-700 hover:text-blue-900 transition-colors"
        >
          ← Back to Trips
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
        </div>
      </div>
    </nav>
  );
};

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const cartCount = cartItems.length;

  const total = cartItems.reduce((sum, item) => {
    const trip = tripsData[Number(item.tripId)];
    const itinerary = trip?.itineraries.find(i => i.id === Number(item.itineraryId));
    return sum + (itinerary?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 py-12 px-4">
      <CartNavbar cartCount={cartCount} />
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-6 mb-8">
              {cartItems.map((item, idx) => {
                const trip = tripsData[Number(item.tripId)];
                const itinerary = trip?.itineraries.find(i => i.id === Number(item.itineraryId));
                if (!trip || !itinerary) return null;
                return (
                  <li key={idx} className="flex items-center gap-6 bg-gray-100 rounded-lg p-4">
                    <img src={itinerary.gallery[0] || trip.overviewImg} alt="Itinerary" className="w-24 h-20 object-cover rounded-lg border" />
                    <div className="flex-1">
                      <div className="font-bold text-lg text-blue-700">{trip.name}</div>
                      <div className="text-gray-700">{itinerary.title}</div>
                      <div className="text-sm text-gray-500">{itinerary.days} days | ${itinerary.price}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.tripId, item.itineraryId)} className="text-red-600 hover:text-red-800 font-semibold">Remove</button>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-green-700">${total}</span>
            </div>
            <button onClick={() => navigate("/checkout")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition mb-2">
              Proceed to Checkout
            </button>
            <button onClick={clearCart} className="w-full text-red-500 hover:text-red-700 text-sm mt-2">Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 