import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      // Prevent duplicates (same tripId + itineraryId)
      if (state.find(item => item.tripId === action.payload.tripId && item.itineraryId === action.payload.itineraryId)) {
        return state;
      }
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter(item => !(item.tripId === action.payload.tripId && item.itineraryId === action.payload.itineraryId));
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };
  const removeFromCart = (tripId, itineraryId) => {
    dispatch({ type: "REMOVE_ITEM", payload: { tripId, itineraryId } });
  };
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 