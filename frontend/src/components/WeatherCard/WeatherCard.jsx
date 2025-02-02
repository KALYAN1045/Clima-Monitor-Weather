import React from "react";
import { Sun, Cloud, MapPin } from "lucide-react";
import clearDay from "$/weather_icons/01d.png";
import clearNight from "$/weather_icons/01n.png";
import fewCloudsDay from "$/weather_icons/02d.png";
import fewCloudsNight from "$/weather_icons/02n.png";
import scatteredCloudsDay from "$/weather_icons/03d.png";
import scatteredCloudsNight from "$/weather_icons/03n.png";
import brokenCloudsDay from "$/weather_icons/04d.png";
import brokenCloudsNight from "$/weather_icons/04n.png";
import showerRainDay from "$/weather_icons/09d.png";
import showerRainNight from "$/weather_icons/09n.png";
import rainDay from "$/weather_icons/10d.png";
import rainNight from "$/weather_icons/10n.png";
import thunderstormDay from "$/weather_icons/11d.png";
import thunderstormNight from "$/weather_icons/11n.png";
import snowDay from "$/weather_icons/13d.png";
import snowNight from "$/weather_icons/13n.png";
import mistDay from "$/weather_icons/50d.png";
import mistNight from "$/weather_icons/50n.png";

import "#/WeatherCard.css"; // Make sure this CSS file is in place for any additional styling

const SmokeAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Smoke particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: `${Math.random() * 40 + 20}px`,
            height: `${Math.random() * 40 + 20}px`,
            left: `${(i % 5) * 25}%`,
            bottom: "-20px",
            animation: `
              smokeRise ${8 + Math.random() * 7}s infinite ease-out ${i * 0.3}s,
              smokeDrift ${12 + Math.random() * 5}s infinite ease-in-out ${
              i * 0.5
            }s,
              smokeExpand ${10 + Math.random() * 5}s infinite ease-out ${
              i * 0.4
            }s,
              smokeFade ${7 + Math.random() * 4}s infinite ease-out ${i * 0.3}s
            `,
          }}
        >
          <div className="w-full h-full bg-gray-600/30 rounded-full blur-xl" />
        </div>
      ))}

      {/* Additional swirling smoke layers */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`swirl-${i}`}
          className="absolute w-full h-32 bottom-0"
          style={{
            animation: `smokeSwirl ${15 + i * 5}s infinite ease-in-out ${
              i * 2
            }s`,
            opacity: 0.2,
          }}
        >
          <div className="w-full h-full bg-gradient-to-t from-gray-700 to-transparent blur-lg" />
        </div>
      ))}

      <style jsx>{`
        @keyframes smokeRise {
          0% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(-300px) scale(2);
          }
        }

        @keyframes smokeDrift {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(${Math.random() > 0.5 ? "" : "-"}100px);
          }
        }

        @keyframes smokeExpand {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(3);
          }
        }

        @keyframes smokeFade {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes smokeSwirl {
          0%,
          100% {
            transform: translateX(0) skewX(0);
          }
          25% {
            transform: translateX(40px) skewX(-5deg);
          }
          75% {
            transform: translateX(-40px) skewX(5deg);
          }
        }
      `}</style>
    </div>
  );
};

const HazeAnimation = () => {
  // Leaf path variations for different leaf shapes
  const leafTypes = [
    "M0,10 Q5,0 10,10 Q15,20 10,20 Q5,20 0,10", // Simple leaf
    "M0,10 C2,5 8,5 10,10 C12,15 8,18 5,20 C2,18 -2,15 0,10", // Curved leaf
    "M0,10 Q8,0 16,10 Q8,20 0,10", // Oval leaf
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Base haze layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-700/30 to-transparent" />

      {/* Animated haze/dust particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={`haze-${i}`}
            className="absolute w-full opacity-40"
            style={{
              height: `${Math.random() * 8 + 4}rem`,
              left: `${(i % 4) * 25}%`,
              top: `${Math.floor(i / 4) * 33}%`,
              animation: `
                hazeFloat ${10 + Math.random() * 5}s infinite ease-in-out ${
                i * 0.5
              }s,
                hazeOpacity ${7 + Math.random() * 4}s infinite ease-in-out ${
                i * 0.3
              }s
              `,
            }}
          >
            <div className="w-full h-full bg-amber-800/30 blur-xl rounded-full" />
          </div>
        ))}
      </div>

      {/* Flying leaves */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute"
            style={{
              left: `-5%`,
              top: `${Math.random() * 100}%`,
              animation: `windLeaf ${6 + Math.random() * 4}s linear infinite ${
                i * 0.5
              }s`,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="transform"
              style={{
                animation: `leafSpin ${2 + Math.random() * 2}s linear infinite`,
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

      {/* Moving light rays */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute w-1/2 h-full opacity-10"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
              animation: `lightRay ${15 + i * 5}s infinite linear ${i * 2}s`,
              transform: "skewX(-20deg)",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes hazeFloat {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(100px);
          }
        }

        @keyframes hazeOpacity {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes windLeaf {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(120vw) translateY(50px);
          }
        }

        @keyframes leafSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes lightRay {
          from {
            transform: translateX(-100%) skewX(-20deg);
          }
          to {
            transform: translateX(300%) skewX(-20deg);
          }
        }
      `}</style>
    </div>
  );
};

// const weatherTypes = [
//   { type: "sun", label: "Sunny" },
//   { type: "cloud", label: "Cloudy" },
//   { type: "rain", label: "Rainy" },
//   { type: "wind", label: "Windy" },
//   { type: "mist", label: "Misty" },
//   { type: "thunder", label: "Thunder" },
// ];

const WeatherCard = ({
  temperature,
  currentWeather,
  weatherType,
  weatherCode,
  city,
}) => {
  const weatherIcons = {
    "01d": clearDay,
    "01n": clearNight,
    "02d": fewCloudsDay,
    "02n": fewCloudsNight,
    "03d": scatteredCloudsDay,
    "03n": scatteredCloudsNight,
    "04d": brokenCloudsDay,
    "04n": brokenCloudsNight,
    "09d": showerRainDay,
    "09n": showerRainNight,
    "10d": rainDay,
    "10n": rainNight,
    "11d": thunderstormDay,
    "11n": thunderstormNight,
    "13d": snowDay,
    "13n": snowNight,
    "50d": mistDay,
    "50n": mistNight,
  };

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
      case "clear":
        return "bg-gradient-to-br from-blue-400 to-blue-200";
      case "clouds":
        return "bg-gradient-to-br from-gray-400 to-gray-200";
      case "rain":
        return "bg-gradient-to-br from-blue-600 to-blue-400";
      case "wind":
        return "bg-gradient-to-br from-gray-500 to-gray-300";
      case "mist":
        return "bg-gradient-to-br from-gray-600 to-gray-600";
      case "smoke":
        return "bg-gradient-to-br from-gray-800 to-gray-600";
      case "fog":
        return "bg-gradient-to-br from-gray-800 to-gray-600";
      case "haze":
        return "bg-gradient-to-br from-gray-600 to-gray-100";
      case "dust":
        return "bg-gradient-to-br from-gray-600 to-gray-100";
      case "thunderstorm":
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
          currentWeather.toLowerCase()
        )}`}
      >
        {/* Temperature Display */}
        <div className="absolute top-4 left-4 flex items-center z-10 font-semibold">
          <div className="text-5xl text-black ">
            {temperature}
            <span className="text-xl"></span>
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
          <span className="text-lg">{city}, India</span>
        </div>

        {/* Weather Code Icon (if provided) */}
        {weatherCode && (
          <div className="absolute top-0 z-10 right-2">
            <img
              src={weatherIcons[weatherCode]} // Use the weatherCode dynamically
              alt="Weather Icon"
              className="w-10 h-10 mt-5 ml-5"
            />
          </div>
        )}
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Sunny Animation (unchanged) */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "clear" ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute top-14 right-[-170px] transform -translate-x-1/2">
              <Sun className="w-44 h-44 text-yellow-400 animate-spin-slow opacity-90" />
            </div>
          </div>

          {/* Cloud Animation */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "clouds" ? "opacity-100" : "opacity-0"
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
              currentWeather === "rain" || currentWeather == "drizzle"
                ? "opacity-100"
                : "opacity-0"
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

          {/* Haze Animation */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "haze" || currentWeather === "dust"
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <HazeAnimation />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "smoke" || currentWeather === "fog"
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <SmokeAnimation />
          </div>

          {/* Thunderstorm with Lightning */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentWeather === "thunderstorm" ? "opacity-100" : "opacity-0"
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
