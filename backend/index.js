const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

const weatherSchema = new mongoose.Schema({
  city: String,
  data: Object,
  timestamp: { type: Date, default: Date.now },
});

const Weather = mongoose.model("Weather", weatherSchema);

// API Endpoint to Save Weather Data
app.post("/api/weather", async (req, res) => {
  const { city, data } = req.body;
  try {
    const weather = new Weather({ city, data });
    await weather.save();
    res.status(201).send({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error saving data", error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
