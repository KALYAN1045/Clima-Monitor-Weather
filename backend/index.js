const express = require("express");
const mongoose = require("mongoose");
const weatherRoutes = require("./routes/weatherRoute");
const alertRoutes = require("./routes/alertRoutes");
const WeatherService = require("./services/weatherService");
require("dotenv").config();
const cors = require("cors");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start weather updates after MongoDB connection is successful
    initializeWeatherUpdates();
    scheduleEndOfDaySummary();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process on connection error
  });

// Initialize the weather service
const weatherService = new WeatherService();

// Metro cities data
const CITIES = {
  DELHI: { id: "1273294", name: "Delhi" },
  MUMBAI: { id: "1275339", name: "Mumbai" },
  CHENNAI: { id: "1264527", name: "Chennai" },
  BANGALORE: { id: "1277333", name: "Bangalore" },
  KOLKATA: { id: "1275004", name: "Kolkata" },
  HYDERABAD: { id: "1269843", name: "Hyderabad" },
};

// Function to handle weather updates for all cities
async function updateWeatherForAllCities() {
  try {
    for (const city of Object.values(CITIES)) {
      console.log(`Updating weather for ${city.name}`);
      await weatherService.updateCityWeather(city.id, city.name);
    }
    console.log("Weather updates complete.");
  } catch (error) {
    console.error("Error during weather updates:", error);
  }
}

// Initialize weather updates with automatic scheduling
function initializeWeatherUpdates() {
  // Initial call to update weather for all cities on server start
  updateWeatherForAllCities();

  // Set up automatic updates every 5 minutes
  const updateInterval = 5 * 60 * 1000; // 5 minutes
  setInterval(updateWeatherForAllCities, updateInterval);
}

// Schedule end-of-day summary storage at midnight
function scheduleEndOfDaySummary() {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );

  const timeUntilMidnight = nextMidnight - now;
  setTimeout(() => {
    weatherService.storeEndOfDaySummary();
    // Schedule it to run again at midnight every day
    setInterval(weatherService.storeEndOfDaySummary, 24 * 60 * 60 * 1000); // Every 24 hours
  }, timeUntilMidnight);
}

// Use weather routes for API-related routes
app.use("/api/weather", weatherRoutes);
app.use("/api/alerts", alertRoutes);

// Basic route to check if the server is running
app.get("/", (req, res) => {
  res.send("Weather API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
