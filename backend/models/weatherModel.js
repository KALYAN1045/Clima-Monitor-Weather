const mongoose = require("mongoose");

const dailySchema = new mongoose.Schema({
  minTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  avgTemp: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
  readings: { type: Number, default: 0 },
  conditionCount: { type: Map, of: Number }, // To track condition frequency
});

const weatherSchema = new mongoose.Schema({
  cityId: { type: String, required: true },
  cityName: { type: String, required: true },
  date: { type: Date, required: true },
  daily: dailySchema, // Current day's statistics
  weekly: [
    {
      date: { type: Date, required: true },         // Date of the day record
      avgTemp: { type: Number, required: true },    // Average temperature of the day
      minTemp: { type: Number, required: true },    // Minimum temperature of the day
      maxTemp: { type: Number, required: true },    // Maximum temperature of the day
      dominantCondition: { type: String, required: true },  // Dominant weather condition of the day
    },
  ], // Store up to 7 days of weather
});

// Create compound index for efficient queries
weatherSchema.index({ cityId: 1, date: 1 }, { unique: true });

const Weather = mongoose.model("Weather", weatherSchema);
module.exports = Weather;
