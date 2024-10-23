import React, { useRef, useEffect } from "react";
import "#/scrollbar.css";
import "#/transition.css";
import { convertTemperature } from "@/services/convertTemperature";
import Arrow from "$/weather_icons/direction.png";
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

const DailyForecast = ({ containerClass, forecastData }) => {
  // Process forecast data from API
  console.log("Raw forecastData:", forecastData);
  const transformForecastData = (data) => {
    // Check if data and data.list exist
    if (!data || !data.list || !Array.isArray(data.list)) {
      console.log("Invalid data structure:", data);
      return [];
    }

    // Transform the data.list array
    return data.list.slice(0, 8).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      temp: item.main.temp,
      wind: Math.round(item.wind.speed * 3.6),
      windDeg: item.wind.deg,
      icon: item.weather[0].icon,
    }));
  };

  const scrollRef = useRef(null);

  // Horizontal scroll handler for wheel events
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

  // Transform the forecast data
  const weatherData = transformForecastData(forecastData);
  console.log("Transformed weatherData:", weatherData);
  const getWeatherIcon = (iconCode) => {
    const icon = weatherIcons[iconCode];
    return (
      <img
        src={icon ? icon : weatherIcons["01d"]} // Fallback to a default icon if the iconCode is not found
        alt="weather icon"
        className="w-8 h-8"
      />
    );
  };

  return (
    <>
      <h2 className={`${containerClass}-text text-xl font-bold mb-2`}>
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
                  {convertTemperature(data.temp.toFixed(1))}°
                </span>
              </div>

              {/* Third Row: Arrow and Wind Speed */}
              <div className="flex items-center justify-center gap-2 w-full">
                <img
                  src={Arrow}
                  alt="Wind Direction"
                  className="w-7 h-7"
                  style={{ transform: `rotate(${data.windDeg}deg)` }} // Rotate the arrow according to wind direction
                />
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
