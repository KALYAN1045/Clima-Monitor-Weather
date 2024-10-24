const express = require("express");
const router = express.Router();
const WeatherService = require("../services/weatherService");
const Weather = require("../models/weatherModel");

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

// router.post("/update-weekly/:cityName", async (req, res) => {
//   const { cityName } = req.params;
//   const { weeklyData } = req.body;

//   try {
//     // Input validation
//     if (!weeklyData || !Array.isArray(weeklyData) || weeklyData.length === 0) {
//       return res.status(400).json({
//         message:
//           "Invalid weekly data format. Expected non-empty array of weather data.",
//       });
//     }

//     // Find the existing weather document for the city
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     let weatherDoc = await Weather.findOne({
//       cityName: cityName,
//       date: {
//         $gte: today,
//       },
//     });

//     if (weatherDoc) {
//       // Update existing document
//       weatherDoc.weekly = weeklyData.map((day) => ({
//         date: new Date(day.date),
//         avgTemp: day.avgTemp,
//         minTemp: day.minTemp,
//         maxTemp: day.maxTemp,
//         dominantCondition: day.dominantCondition,
//       }));

//       await weatherDoc.save();

//       res.status(200).json({
//         message: `Weekly data updated successfully for ${cityName}`,
//         data: weatherDoc.weekly,
//       });
//     } else {
//       // Create new document if none exists
//       const newWeatherDoc = new Weather({
//         cityName: cityName,
//         cityId: cityName.toLowerCase(), // You might want to modify this based on your city ID logic
//         date: today,
//         daily: {
//           minTemp: 0,
//           maxTemp: 0,
//           avgTemp: 0,
//           dominantCondition: "Unknown",
//           readings: 0,
//           conditionCount: new Map(),
//         },
//         weekly: weeklyData.map((day) => ({
//           date: new Date(day.date),
//           avgTemp: day.avgTemp,
//           minTemp: day.minTemp,
//           maxTemp: day.maxTemp,
//           dominantCondition: day.dominantCondition,
//         })),
//       });

//       await newWeatherDoc.save();

//       res.status(201).json({
//         message: `New weather document created with weekly data for ${cityName}`,
//         data: newWeatherDoc.weekly,
//       });
//     }
//   } catch (error) {
//     console.error("Error updating weekly data:", error);
//     res.status(500).json({
//       message: "Error updating weekly data",
//       error: error.message,
//       details: error.stack,
//     });
//   }
// });

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
