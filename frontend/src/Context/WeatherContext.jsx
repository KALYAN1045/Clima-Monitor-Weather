// src/context/WeatherContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { fetchData, url } from "../services/api";
import { getDate, aqiText } from "../utils/utils";

export const WeatherContext = createContext();

const citiesCoordinates = {
  Delhi: { lat: 28.7041, lon: 77.1025 },
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Chennai: { lat: 13.0827, lon: 80.2707 },
  Bangalore: { lat: 12.9716, lon: 77.5946 },
  Kolkata: { lat: 22.5726, lon: 88.3639 },
  Hyderabad: { lat: 17.385, lon: 78.4867 },
};

const WeatherProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airPollution, setAirPollution] = useState(null);
  const [location, setLocation] = useState({ name: "Delhi", country: "IN" });
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = () => {
    const { lat, lon } = citiesCoordinates[selectedCity];
    setLoading(true);
  
    // Fetch Current Weather
    fetchData(url.currentWeather(lat, lon), (data) => {
      setCurrentWeather(data);
      // Fetch Location Name
      fetchData(url.reverseGeo(lat, lon), (locData) => {
        if (locData.length > 0) {
          setLocation({ name: locData[0].name, country: locData[0].country });
        }
      });
  

      fetchData(url.airPollution(lat, lon), (airData) => {
        setAirPollution(airData);
      });
  

      fetch(`${import.meta.env.VITE_APP_API}/weather`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: selectedCity, data }),
      }).catch((error) => console.error('Error sending data to backend:', error));
    });
  
    
    fetchData(url.forecast(lat, lon), (data) => {
      setForecast(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchWeatherData();

    // Set interval to fetch data every 5 minutes
    const interval = setInterval(fetchWeatherData, 300000); // 300,000 ms = 5 minutes

    return () => clearInterval(interval);
  }, [selectedCity]);

  return (
    <WeatherContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        currentWeather,
        forecast,
        airPollution,
        location,
        loading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
