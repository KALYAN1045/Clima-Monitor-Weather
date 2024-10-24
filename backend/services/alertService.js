const City = require("../models/alertModel");

// Create a new alert for a city
exports.createAlertForCity = async (req, res) => {
  try {
    const {
      cityName,
      alertName,
      email,
      temperature,
      humidity,
      windSpeed,
      cloudCoverage,
    } = req.body;

    // Find or create a city document
    let city = await City.findOne({ cityName });

    if (!city) {
      city = new City({ cityName, alerts: [] });
    }

    // Add the new alert to the city's alert array
    const newAlert = {
      alertName,
      email,
      temperature,
      humidity, // Optional
      windSpeed, // Optional
      cloudCoverage, // Optional
    };

    city.alerts.push(newAlert); // Push the new alert

    await city.save();
    res.status(201).json({ message: "Alert created successfully", city });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create alert", details: error.message });
  }
};

// Get all alerts for a specific city
exports.getAlertsForCity = async (req, res) => {
  try {
    const { cityName } = req.params;
    const city = await City.findOne({ cityName });

    // If city doesn't exist, return empty array instead of 404
    if (!city) {
      return res.status(200).json({ alerts: [] });
    }

    // Always return alerts array (empty or not)
    return res.status(200).json({ alerts: city.alerts });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alerts", details: error.message });
  }
};


// Delete a specific alert from a city
exports.deleteAlertFromCity = async (req, res) => {
  try {
    const { cityName, alertId } = req.params;

    // Find the city and update the alerts array by removing the alert with the given ID
    const city = await City.findOneAndUpdate(
      { cityName },
      { $pull: { alerts: { _id: alertId } } }, // Remove the alert by ID
      { new: true }
    );

    if (!city) {
      return res
        .status(404)
        .json({ error: `City ${cityName} or alert not found` });
    }

    res.status(200).json({ message: "Alert deleted successfully", city });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete alert", details: error.message });
  }
};
