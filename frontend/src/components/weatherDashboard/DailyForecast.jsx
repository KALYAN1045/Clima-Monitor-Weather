// src/components/DailyForecast.jsx
import React, { useRef, useEffect } from "react";
import { Cloud, CloudRain, Sun, Moon } from "lucide-react";
import "#/scrollbar.css";
import "#/transition.css";
import Arrow from "@/assets/weather_icons/direction.png";

const DailyForecast = ({ containerClass }) => {
  const weatherData = [
    {
      time: "11:30 PM",
      temp: 22.07,
      wind: 10,
      icon: "rain",
      condition: "rainy",
    },
    {
      time: "2:30 AM",
      temp: 21.95,
      wind: 10,
      icon: "rain",
      condition: "rainy",
    },
    {
      time: "5:30 AM",
      temp: 21.26,
      wind: 10,
      icon: "rain",
      condition: "rainy",
    },
    {
      time: "8:30 AM",
      temp: 24.25,
      wind: 10,
      icon: "partlyCloudy",
      condition: "partly cloudy",
    },
    {
      time: "11:30 AM",
      temp: 27.76,
      wind: 8,
      icon: "sunny",
      condition: "sunny",
    },
    {
      time: "2:30 PM",
      temp: 29.2,
      wind: 10,
      icon: "partlyCloudy",
      condition: "partly cloudy",
    },
    {
      time: "5:30 PM",
      temp: 25.92,
      wind: 14,
      icon: "partlyCloudy",
      condition: "partly cloudy",
    },
    {
      time: "8:30 PM",
      temp: 23.17,
      wind: 13,
      icon: "night",
      condition: "night",
    },
  ];

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case "rain":
        return <CloudRain className="w-12 h-12 text-blue-400" />;
      case "sunny":
        return <Sun className="w-12 h-12 text-yellow-400" />;
      case "partlyCloudy":
        return (
          <div className="relative">
            <Sun className="w-12 h-12 text-yellow-400" />
            <Cloud className="w-8 h-8 text-gray-300 absolute -right-1 -bottom-1" />
          </div>
        );
      case "night":
        return <Moon className="w-12 h-12 text-gray-300" />;
      default:
        return <Cloud className="w-12 h-12 text-gray-400" />;
    }
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    const onWheel = (e) => {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    };

    scrollContainer.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <>
      <h2 className={`${containerClass}-text text-xl font-semibold mb-2`}>
        Today at
      </h2>
      <div ref={scrollRef} className="overflow-x-auto scroll-container">
        <div
          className="inline-flex gap-4 pb-4"
          style={{ minWidth: "min-content" }}
        >
          {weatherData.map((data, index) => (
            <div
              key={index}
              className={`${containerClass} shine-effect p-4 rounded-lg flex flex-col items-center gap-4 min-w-[9rem] h-48`}
            >
              {/* First Row: Time */}
              <span className="text-lg">{data.time}</span>

              {/* Second Row: Icon and Temperature */}
              <div className="flex items-center justify-center gap-2 w-full">
                {getWeatherIcon(data.icon)}
                <span className=" text-2xl font-medium">
                  {data.temp.toFixed(1)}°
                </span>
              </div>

              {/* Third Row: Arrow and Wind Speed */}
              <div className="flex items-center justify-center gap-2 w-full">
                <img src={Arrow} alt="Wind Direction" className="w-5 h-5" />
                <span className=" text-lg">{data.wind} Km/h</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DailyForecast;
