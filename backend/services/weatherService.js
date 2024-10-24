const axios = require("axios");
const Weather = require("../models/weatherModel");
const City = require("../models/alertModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;

    // Nodemailer transporter configuration
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail email address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    });
  }

  // Function to update the city's weather every 5 minutes
  async updateCityWeather(cityId, cityName) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.apiKey}&units=metric`
      );

      const weatherData = response.data;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find existing record by cityName and today's date
      let record = await Weather.findOne({
        cityName,
        date: today,
      });

      if (!record) {
        // Create new record if none exists for today
        record = new Weather({
          cityName,
          date: today,
          daily: {
            minTemp: weatherData.main.temp,
            maxTemp: weatherData.main.temp,
            avgTemp: weatherData.main.temp,
            dominantCondition: weatherData.weather[0].main,
            readings: 1,
            conditionCount: new Map([[weatherData.weather[0].main, 1]]),
          },
          weekly: [], // Initialize empty weekly array
        });
        await record.save();
      } else {
        // Update existing record's daily data
        const newReadings = record.daily.readings + 1;
        const currentTemp = weatherData.main.temp;

        // Prepare the update data
        const updateData = {
          "daily.readings": newReadings,
          "daily.avgTemp": (
            (record.daily.avgTemp * record.daily.readings + currentTemp) /
            newReadings
          ).toFixed(1),
          "daily.minTemp": Math.min(record.daily.minTemp, currentTemp),
          "daily.maxTemp": Math.max(record.daily.maxTemp, currentTemp),
        };

        // Update condition count
        const currentCondition = weatherData.weather[0].main;
        const conditionCount = record.daily.conditionCount || new Map();
        conditionCount.set(
          currentCondition,
          (conditionCount.get(currentCondition) || 0) + 1
        );
        updateData["daily.conditionCount"] = conditionCount;

        // Find the most frequent condition
        let maxCount = 0;
        let dominantCondition = currentCondition;
        for (const [condition, count] of conditionCount.entries()) {
          if (count > maxCount) {
            maxCount = count;
            dominantCondition = condition;
          }
        }
        updateData["daily.dominantCondition"] = dominantCondition;

        // Update the record
        record = await Weather.findOneAndUpdate(
          { _id: record._id },
          { $set: updateData },
          { new: true }
        );
      }

      await this.checkAndSendAlerts(cityName, weatherData);
      return record;
    } catch (error) {
      console.error(`Error updating weather for ${cityName}:`, error);
      throw error;
    }
  }

  async checkAndSendAlerts(cityName, weatherData) {
    try {
      const city = await City.findOne({ cityName });
      if (!city || !city.alerts.length) {
        return; // No alerts set for this city
      }

      // Check the weather data against each alert
      for (const alert of city.alerts) {
        let shouldSendEmail = false;
        let exceededMetrics = [];

        // Check temperature
        if (alert.temperature && weatherData.main.temp >= alert.temperature) {
          exceededMetrics.push(`Temperature: ${weatherData.main.temp}°C`);
          shouldSendEmail = true;
        }

        // Check humidity
        if (alert.humidity && weatherData.main.humidity >= alert.humidity) {
          exceededMetrics.push(`Humidity: ${weatherData.main.humidity}%`);
          shouldSendEmail = true;
        }

        // Check wind speed
        if (alert.windSpeed && weatherData.wind.speed >= alert.windSpeed) {
          exceededMetrics.push(`Wind Speed: ${weatherData.wind.speed} km/h`);
          shouldSendEmail = true;
        }

        // Check cloud coverage
        if (
          alert.cloudCoverage &&
          weatherData.clouds.all >= alert.cloudCoverage
        ) {
          exceededMetrics.push(`Cloud Coverage: ${weatherData.clouds.all}%`);
          shouldSendEmail = true;
        }

        // If any threshold is exceeded, send an email alert
        if (shouldSendEmail) {
          const exceededMetricsText = exceededMetrics.join(", ");

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: alert.email,
            subject: `Weather Alert for ${cityName}: ${alert.alertName}`,
            text: `Dear user,\n\nThe following weather thresholds have been exceeded in ${cityName}:\n\n${exceededMetricsText}.\n\nPlease take necessary precautions.\n\nBest regards,\nClimaCore (Weather Alert System)`,
          };

          await this.transporter.sendMail(mailOptions);
          console.log(`Alert email sent to ${alert.email} for ${cityName}`);
        }
      }
    } catch (error) {
      console.error("Error checking or sending alerts:", error);
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
