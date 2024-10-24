const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  alertName: { type: String, required: true }, // Alert name
  email: { type: String, required: true, match: /^[\w.%+-]+@gmail\.com$/ }, // Gmail validation
  temperature: { type: Number, required: true }, // Temperature threshold
  humidity: { type: Number, required: false }, // Humidity threshold
  windSpeed: { type: Number, required: false }, // Wind speed threshold
  cloudCoverage: { type: Number, required: false }, // Cloud coverage threshold
  createdAt: { type: Date, default: Date.now }, // Date of creation
});

// City schema that embeds the alerts array
const citySchema = new mongoose.Schema({
  cityName: { type: String, required: true, unique: true }, // City name
  alerts: [alertSchema], // Array of alerts for this city
  createdAt: { type: Date, default: Date.now }, // Date city was added
});

const City = mongoose.model('City', citySchema);
module.exports = City;
