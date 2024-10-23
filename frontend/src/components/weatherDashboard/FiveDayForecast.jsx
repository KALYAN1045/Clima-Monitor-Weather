import React from "react";
import "#/transition.css";
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

const FiveDayForecast = ({ containerClass, forecastData }) => {
  const getDailySummary = (list) => {
    const dailyMap = list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split("T")[0];

      if (!acc[dateKey]) {
        acc[dateKey] = {
          temps: [],
          conditions: [],
          icons: [], // Track all icons for the day
          day: date.toLocaleDateString("en-US", { weekday: "long" }),
          date: date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          }),
        };
      }
      acc[dateKey].temps.push(item.main.temp);
      acc[dateKey].conditions.push(item.weather[0].main.toLowerCase());
      acc[dateKey].icons.push(item.weather[0].icon); // Store icon codes
      return acc;
    }, {});

    return Object.values(dailyMap)
      .map((data) => {
        const avgTemp = Math.round(
          data.temps.reduce((a, b) => a + b, 0) / data.temps.length
        );

        // Get most frequent weather condition and icon
        const iconCount = data.icons.reduce((acc, icon) => {
          acc[icon] = (acc[icon] || 0) + 1;
          return acc;
        }, {});

        const mostFrequentIcon = Object.entries(iconCount).sort(
          ([, a], [, b]) => b - a
        )[0][0];

        return {
          day: data.day,
          date: data.date,
          temp: avgTemp,
          icon: mostFrequentIcon, // Use the most frequent icon for the day
        };
      })
      .slice(0, 5);
  };

  const processedForecast = forecastData
    ? getDailySummary(forecastData.list)
    : [];

  const getWeatherIcon = (iconCode) => {
    return (
      <img
        src={weatherIcons[iconCode]}
        alt="weather icon"
        className="w-8 h-8"
      />
    );
  };

  return (
    <>
      <h2 className={`${containerClass}-text text-xl font-semibold mb-4`}>
        5 Days Forecast
      </h2>
      <div className="space-y-4">
        {processedForecast.map((day) => (
          <div
            key={day.date}
            className={`${containerClass} flex items-center justify-between p-2 rounded-md`} // Shorter padding and height
            style={{ height: "65px" }} // Adjust height to make the box shorter
          >
            <div className="flex items-center gap-2 ml-5">
              {getWeatherIcon(day.icon)}
              <span className="text-xl font-medium">{day.temp}°</span>{" "}
              {/* Adjusted text size */}
            </div>
            <div className="w-20 text-center">
              <span className="font-medium text-lg">{day.date}</span>{" "}
              {/* Adjusted font size */}
            </div>
            <div className="w-20 text-right">
              <span className="font-medium text-sm mr-5">{day.day}</span>{" "}
              {/* Adjusted font size */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FiveDayForecast;
