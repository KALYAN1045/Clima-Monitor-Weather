const express = require("express");
const router = express.Router();
const WeatherService = require("../services/weatherService");

const weatherService = new WeatherService();

// Route to get the daily weather data for a specific city
router.get("/daily/:cityName", async (req, res) => {
  try {
    const cityName = req.params.cityName;

    // Fetch the daily weather data for the city from the database
    const cityWeather = await weatherService.getCityDailyWeather(cityName);

    if (!cityWeather) {
      return res
        .status(404)
        .json({ error: `No daily weather data found for ${cityName}` });
    }

    res.json({
      success: true,
      data: cityWeather.daily, // Send only the daily summary
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to retrieve weather data: ${error.message}` });
  }
});

// Add routes to get weather data, e.g.:
router.get("/weekly/:cityName", async (req, res) => {
  try {
    const weeklyData = await weatherService.getWeeklyData(req.params.cityName);
    res.json(weeklyData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/test-end-of-day", async (req, res) => {
  try {
    await weatherService.storeEndOfDaySummary();
    res.send("End-of-day summary updated successfully.");
  } catch (error) {
    res
      .status(500)
      .send("Error during end-of-day summary update: " + error.message);
  }
});

module.exports = router;
