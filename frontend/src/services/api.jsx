export const fetchData = async (URL, callback) => {
  try {
    const response = await fetch(
      `${URL}&appid=${import.meta.env.VITE_APP_OPEN_API}`
    );
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors appropriately
  }
};

export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  },
  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`;
  },
  airPollution(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`;
  },
  reverseGeo(lat, lon) {
    return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1`;
  },
};
