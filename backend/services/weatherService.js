const axios = require("axios");
const Weather = require("../models/weatherModel");
require("dotenv").config();

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
  }

  // Function to update the city's weather every 5 minutes
  async updateCityWeather(cityId, cityName) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.apiKey}&units=metric`
      );

      const weatherData = response.data;
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset hours to get only the date

      // Find or create today's record
      let record = await Weather.findOne({ cityId, date: today });

      if (!record) {
        record = new Weather({
          cityId,
          cityName,
          date: today,
          daily: {
            minTemp: weatherData.main.temp,
            maxTemp: weatherData.main.temp,
            avgTemp: weatherData.main.temp.toFixed(1),
            dominantCondition: weatherData.weather[0].main,
            readings: 1,
            conditionCount: {
              [weatherData.weather[0].main]: 1,
            },
          },
          weekly: [], // Initialize empty weekly array if new record
        });
      } else {
        // Ensure `record.daily` is initialized if it's null or undefined
        if (!record.daily) {
          record.daily = {
            minTemp: weatherData.main.temp,
            maxTemp: weatherData.main.temp,
            avgTemp: weatherData.main.temp.toFixed(1),
            dominantCondition: weatherData.weather[0].main,
            readings: 1,
            conditionCount: {
              [weatherData.weather[0].main]: 1,
            },
          };
        } else {
          // Update daily statistics
          const newReadings = record.daily.readings + 1;

          // Update avgTemp
          record.daily.avgTemp =
            (record.daily.avgTemp * record.daily.readings +
              weatherData.main.temp) /
            newReadings;

          // Update minTemp and maxTemp if necessary
          record.daily.minTemp = Math.min(
            record.daily.minTemp,
            weatherData.main.temp
          );
          record.daily.maxTemp = Math.max(
            record.daily.maxTemp,
            weatherData.main.temp
          );

          // Update dominant condition
          const currentCondition = weatherData.weather[0].main;
          record.daily.conditionCount[currentCondition] =
            (record.daily.conditionCount[currentCondition] || 0) + 1;

          // Recalculate dominantCondition
          record.daily.dominantCondition = Object.keys(
            record.daily.conditionCount
          ).reduce((a, b) =>
            record.daily.conditionCount[a] > record.daily.conditionCount[b]
              ? a
              : b
          );

          record.daily.readings = newReadings;
        }
      }

      await record.save();
      return record;
    } catch (error) {
      console.error(`Error updating weather for ${cityName}:`, error);
      throw error;
    }
  }

  async storeEndOfDaySummary() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Today's date at 00:00

      // Find all records where `daily` data exists
      const todayRecords = await Weather.find({
        daily: { $exists: true, $ne: null }, // Only get records with daily data
      });

      for (const record of todayRecords) {
        // Create a summary for the current day
        const dailySummary = {
          date: today,
          avgTemp: record.daily.avgTemp.toFixed(1),
          minTemp: record.daily.minTemp,
          maxTemp: record.daily.maxTemp,
          dominantCondition: record.daily.dominantCondition,
        };

        // Add daily summary to the `weekly` array
        record.weekly.push(dailySummary);

        // Keep only the last 7 days in the `weekly` array
        if (record.weekly.length > 7) {
          record.weekly.shift(); // Remove the oldest entry
        }

        // Clear the `daily` data for the next day
        record.daily = null;

        // Save the updated record with the new weekly data
        await record.save();
      }

      console.log("End-of-day summaries stored successfully.");
    } catch (error) {
      console.error("Error storing end-of-day summaries:", error);
      throw error;
    }
  }

  async getCityDailyWeather(cityName) {
    try {
      // Fetch the most recent record for the city from the database
      const cityWeather = await Weather.findOne({ cityName }).sort({
        date: -1,
      });

      if (!cityWeather || !cityWeather.daily) {
        throw new Error(`No daily weather data found for city: ${cityName}`);
      }

      // Return only the daily summary
      return cityWeather;
    } catch (error) {
      console.error(
        `Error fetching daily weather data for ${cityName}:`,
        error
      );
      throw error;
    }
  }

  // Add a method to get weekly data
  async getWeeklyData(cityName) {
    try {
      // Find the latest weather record by cityName
      const record = await Weather.findOne({ cityName }).sort({ date: -1 });
      if (!record) {
        throw new Error(`No data found for city ${cityName}`);
      }
      return {
        cityName: record.cityName,
        weekly: record.weekly || [],
      };
    } catch (error) {
      console.error(`Error getting weekly data for city ${cityName}:`, error);
      throw error;
    }
  }
}
module.exports = WeatherService;
