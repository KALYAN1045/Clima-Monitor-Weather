import React, { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  CloudFog,
  CloudLightning,
  MapPin,
} from "lucide-react";
import "./WeatherCard.css"; // Make sure this CSS file is in place for any additional styling

const WeatherCard = ({
  temperature,
  currentWeather,
  weatherType,
  weatherCode,
}) => {
  // Fetch the weather icon from OpenWeatherMap using current weather code
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;

  const leafPath = "M10,0 C10,0 20,10 10,20 C10,20 0,10 10,0";

  // Create an array of different leaf shapes for variety
  const leafTypes = [
    "M10,0 C15,5 20,10 10,20 C0,10 5,5 10,0", // Simple pointed leaf
    "M10,0 C14,4 20,5 15,15 C12,20 8,20 5,15 C0,5 6,4 10,0", // Oak-like leaf
    "M10,0 C15,2 18,8 15,15 C12,18 8,18 5,15 C2,8 5,2 10,0", // Round leaf
    leafPath, // Maple leaf
  ];

  // Function to get the background color based on the weather type
  const getBackgroundColor = (type) => {
    switch (type) {
      case "sun":
        return "bg-gradient-to-br from-blue-400 to-blue-200";
      case "cloud":
        return "bg-gradient-to-br from-gray-400 to-gray-200";
      case "rain":
        return "bg-gradient-to-br from-blue-600 to-blue-400";
      case "wind":
        return "bg-gradient-to-br from-gray-500 to-gray-300";
      case "mist":
        return "bg-gradient-to-br from-gray-600 to-gray-600";
      case "thunder":
        return "bg-gradient-to-br from-gray-700 to-gray-500";
      default:
        return "bg-gradient-to-br from-blue-400 to-blue-200";
    }
  };

  return (
    <>
      {/* Weather Display */}
      <div
        className={`relative w-64 h-72 rounded-lg shadow-2xl overflow-hidden transition-all duration-500 bg-gradient-to-br ${getBackgroundColor(
          currentWeather
        )}`}
      >
        {/* Temperature Display */}
        <div className="absolute top-4 left-4 flex items-center z-10 font-semibold">
          <div className="text-5xl text-black ">
            {temperature}°<span className="text-xl">C</span>
          </div>
        </div>

        {/* Weather Type */}
        <div className="absolute top-20 left-4 z-10">
          <span className="text-2xl font-medium text-black  capitalize ">
            {weatherType}
          </span>
        </div>

        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center text-black z-10">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-lg">Bangalore, India</span>
        </div>

        {/* Weather Code Icon (if provided) */}
        {weatherCode && (
          <div className="absolute top-0 z-10 right-2">
            <img
              src={`https://openweathermap.org/img/wn/${weatherCode}@2x.png`}
              alt="Weather Icon"
              className="w-15 h-15"
            />
          </div>
        )}
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Sunny Animation (unchanged) */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "sun" ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute top-14 right-[-170px] transform -translate-x-1/2">
              <Sun className="w-44 h-44 text-yellow-400 animate-spin-slow opacity-90" />
            </div>
          </div>

          {/* Cloud Animation */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "cloud" ? "opacity-100" : "opacity-0"
            }`}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${i * 20}%`,
                  top: `${20 + (i % 3) * 15}%`,
                  animationName: "floating",
                  animationDuration: `${3 + (i % 2)}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <Cloud
                  className={`w-20 h-20 text-white  opacity-${
                    70 - (i % 3) * 20
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Rain Animation */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "rain" ? "opacity-100" : "opacity-0"
            }`}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 bg-blue-200 opacity-50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 100}%`,
                  height: `${Math.random() * 30 + 10}px`,
                  animationName: "falling",
                  animationDuration: "1s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Wind Animation with Leaves */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "wind" ? "opacity-100" : "opacity-0"
            }`}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `-5%`,
                  top: `${Math.random() * 100}%`,
                  animationName: "windLeaf",
                  animationDuration: `${6 + Math.random() * 4}s`,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="transform"
                  style={{
                    animationName: "leafSpin",
                    animationDuration: `${2 + Math.random() * 2}s`,
                    animationTimingFunction: "linear",
                    animationIterationCount: "infinite",
                    fill: `hsl(${120 + Math.random() * 40}, ${
                      70 + Math.random() * 20
                    }%, ${40 + Math.random() * 20}%)`,
                  }}
                >
                  <path d={leafTypes[i % leafTypes.length]} />
                </svg>
              </div>
            ))}
          </div>

          {/* Mist Animation */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "mist" ? "opacity-100" : "opacity-0"
            }`}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-12 bg-white/50 blur-md"
                style={{
                  top: `${i * 20}%`,
                  animationName: "mistFlow",
                  animationDuration: `${8 + i * 2}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 1}s`,
                }}
              />
            ))}
          </div>

          {/* Thunderstorm with Lightning */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "thunder" ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Rain for Thunder */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 bg-blue-200 opacity-50"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 100}%`,
                  height: `${Math.random() * 30 + 10}px`,
                  animationName: "falling",
                  animationDuration: "1s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
            {/* Less Frequent Lightning Flashes */}
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 bg-yellow-400/70"
                style={{
                  animationName: "lightning",
                  animationDuration: "12s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDelay: `${i * 6 + 1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
