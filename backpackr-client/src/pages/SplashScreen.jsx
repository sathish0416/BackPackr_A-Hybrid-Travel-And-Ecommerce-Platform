import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../assets/bg1.jpeg"; // Make sure your image is here!
import backpackIcon from "../assets/backpack1.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5500); // 5.5 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-neutralDark bg-opacity-70"></div>
      <div className="relative z-10 flex flex-col items-center -mt-10">
        {/* Logo */}
        <span className="text-5xl md:text-6xl font-extrabold tracking-wide text-neutralLight drop-shadow-lg flex items-center">
          Backpack<span className="text-primary">r</span>
          <img src={backpackIcon} alt="Backpack Icon" className="ml-2 w-10 h-10 inline-block mt-3" />
        </span>
        {/* Tagline */}
        <p className="mt-4 text-xl md:text-2xl text-secondary font-medium italic drop-shadow-md">
          Pack Smart. Travel Far.
        </p>
        {/* Loader */}
        <div className="mt-10">
          <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 