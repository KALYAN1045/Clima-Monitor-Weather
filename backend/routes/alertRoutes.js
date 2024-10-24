const express = require("express");
const router = express.Router();
const cityController = require("../services/alertService");

// Route to create a new alert for a city
router.post("/", cityController.createAlertForCity);

// Route to get all alerts for a specific city
router.get("/:cityName", cityController.getAlertsForCity);

// Route to delete an alert by city and alert ID
router.delete("/:cityName/:alertId", cityController.deleteAlertFromCity);

module.exports = router;
