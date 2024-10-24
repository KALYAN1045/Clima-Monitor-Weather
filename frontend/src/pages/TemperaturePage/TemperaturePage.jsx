
import React, { useEffect, useState } from "react";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import {
  convertTemperature,
  getTemperatureUnit,
} from "@/services/convertTemperature";

const TemperaturePage = ({ isNight, weatherData, userPreferences }) => {
  const [timeOfDay, setTimeOfDay] = useState("");
  const name = userPreferences?.name || "User";
  const tempUnit = userPreferences?.temperatureUnit || "celsius";

  useEffect(() => {
    const now = new Date();
    const hours = now.getUTCHours() + 5;
    if (hours < 12) setTimeOfDay("Good Morning");
    else if (hours < 17) setTimeOfDay("Good Afternoon");
    else setTimeOfDay("Good Evening");
  }, []);

  const themeClasses = {
    text: isNight ? "text-base-light" : "text-base-dark",
    container: isNight ? "bg-white/20" : "bg-white/30",
  };

  const unit = getTemperatureUnit(tempUnit);

  return (
    <div className="relative min-h-[500px] flex justify-center items-center ml-40">
      <div className="absolute left-10 flex flex-col justify-center items-start text-white">
        <h1 className={`${themeClasses.text} text-5xl font-bold`}>
          {`${timeOfDay}, ${name}`}
        </h1>
        <p className={`${themeClasses.text} mt-2 text-lg`}>
          {weatherData?.name
            ? `Weather update at ${weatherData.name}, ${
                weatherData.weather?.[0]?.description || ""
              }`
            : "Here's your update for the day!"}
        </p>
        <div
          className={`${themeClasses.text} mt-6 ${themeClasses.container} backdrop-blur-md p-6 rounded-lg shadow-md bottom-0`}
        >
          <div className="flex justify-between space-x-8 text-center gap-x-3">
            <div>
              <p className="font-semibold">Feels Like</p>
              <p className="text-lg">
                {weatherData?.main?.feels_like
                  ? `${convertTemperature(
                      weatherData.main.feels_like,
                      tempUnit
                    )}${unit}`
                  : "--"}
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
              ? `${convertTemperature(weatherData.main.temp, tempUnit)}${unit}`
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
