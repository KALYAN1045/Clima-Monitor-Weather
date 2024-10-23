import React, { useEffect, useState } from "react";
import WeatherCard from "@/components/WeatherCard/WeatherCard";

// const weatherTypes = [
//   { type: "sun", label: "Sunny" },
//   { type: "cloud", label: "Cloudy" },
//   { type: "rain", label: "Rainy" },
//   { type: "wind", label: "Windy" },
//   { type: "mist", label: "Misty" },
//   { type: "thunder", label: "Thunder" },
// ];

const TemperaturePage = ({ isNight, weatherData }) => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const name = "John"; // Replace with dynamic user name if needed

  useEffect(() => {
    const now = new Date();
    const hours = now.getUTCHours() + 5; // India's time zone is UTC+5:30
    if (hours < 12) setTimeOfDay("Good Morning");
    else if (hours < 17) setTimeOfDay("Good Afternoon");
    else setTimeOfDay("Good Evening");
  }, []);

  const themeClasses = {
    text: isNight ? "text-base-light" : "text-base-dark",
    container: isNight ? "bg-white/20" : "bg-white/30",
  };

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

  return (
    <div className="relative min-h-[500px] flex justify-center items-center ml-40">
      <div className="absolute left-10 flex flex-col justify-center items-start text-white">
        <h1
          className={`${themeClasses.text} text-5xl font-bold`}
        >{`${timeOfDay}, ${name}`}</h1>
        <p className={`${themeClasses.text} mt-2 text-lg`}>
          Here's your weather update for the day.
        </p>
        <div
          className={`${themeClasses.text} mt-6 bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-md bottom-0`}
        >
          <div className="flex justify-between space-x-8 text-center gap-x-3">
            <div>
              <p className="font-semibold">Feels Like</p>
              <p className="text-lg">
                {weatherData?.main?.feels_like
                  ? kelvinToCelsius(weatherData.main.feels_like)
                  : "--"}
                °C
              </p>
            </div>
            <div>
              <p className="font-semibold">Humidity</p>
              <p className="text-lg">{weatherData?.main?.humidity || "--"}%</p>
            </div>
            <div>
              <p className="font-semibold">Wind Speed</p>
              <p className="text-lg">{weatherData?.wind?.speed || "--"} km/h</p>
            </div>
            <div>
              <p className="font-semibold">Pressure</p>
              <p className="text-lg">
                {weatherData?.main?.pressure || "--"} hPa
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-36 flex justify-center items-center">
        <WeatherCard
          temperature={
            weatherData?.main?.temp
              ? kelvinToCelsius(weatherData.main.temp)
              : "--"
          }
          weatherCode={weatherData?.weather?.[0]?.icon || "01d"}
          weatherType={weatherData?.weather?.[0]?.main || "Unknown"}
          currentWeather={
            weatherData?.weather?.[0]?.main?.toLowerCase() || "sun"
          }
          city={weatherData?.name || "Unknown"}
        />
      </div>
    </div>
  );
};

export default TemperaturePage;
