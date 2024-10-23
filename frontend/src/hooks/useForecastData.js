import { useState, useEffect } from 'react';

// Store API responses for different cities
const cityForecasts = new Map();

export const useForecastData = (lat, lon, API_KEY) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      // Create a unique key for this location
      const locationKey = `${lat}-${lon}`;

      // Check if we already have data for this location
      if (cityForecasts.has(locationKey)) {
        setForecastData(cityForecasts.get(locationKey));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?` +
          `lat=${lat}&lon=${lon}&` +
          `units=metric&` +
          `appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }

        const data = await response.json();
        
        // Store the response in our Map
        cityForecasts.set(locationKey, data);
        
        setForecastData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (lat && lon && API_KEY) {
      fetchForecast();
    }
  }, [lat, lon, API_KEY]);

  return { forecastData, loading, error };
};