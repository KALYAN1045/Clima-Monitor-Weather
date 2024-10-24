import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  Mail,
  Bell,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const AlertsPage = ({ currentCity = "Delhi" }) => {
  const [email, setEmail] = useState("");
  const [alertName, setAlertName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [cloudCoverage, setCloudCoverage] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [existingAlerts, setExistingAlerts] = useState([]);
  const [noAlertsMessage, setNoAlertsMessage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_APP_API;

  // Function to fetch alerts
  const fetchAlerts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/alerts/${currentCity}`
      );

      const alerts = response.data?.alerts || [];
      if (alerts.length > 0) {
        setExistingAlerts(alerts);
        setNoAlertsMessage("");
      } else {
        setExistingAlerts([]);
        setNoAlertsMessage(`No alerts found for ${currentCity}.`);
      }
    } catch (error) {
      setExistingAlerts([]);
      if (error.response?.status === 404) {
        setNoAlertsMessage(`No alerts found for ${currentCity}.`);
      } else {
        setNoAlertsMessage("Failed to fetch alerts. Please try again.");
        console.error("Error fetching alerts:", error);
      }
    }
  };

  // Fetch existing alerts when the currentCity changes
  useEffect(() => {
    if (currentCity) {
      fetchAlerts();
    }
  }, [currentCity]);

  // Handle form submission to create a new alert
  const handleCreateAlert = async () => {
    if (!alertName || !email || !temperature) {
      alert("Please fill in required fields.");
      return;
    }

    const newAlert = {
      alertName,
      email,
      cityName: currentCity,
      temperature: parseFloat(temperature),
      humidity: humidity ? parseFloat(humidity) : null,
      windSpeed: windSpeed ? parseFloat(windSpeed) : null,
      cloudCoverage: cloudCoverage ? parseFloat(cloudCoverage) : null,
      weatherCondition,
    };

    try {
      // Create the alert
      await axios.post(`${API_BASE_URL}/api/alerts`, newAlert);

      // Fetch updated alerts after creation
      await fetchAlerts();

      // Clear form fields
      setAlertName("");
      setEmail("");
      setTemperature("");
      setHumidity("");
      setWindSpeed("");
      setCloudCoverage("");
      setWeatherCondition("");
    } catch (error) {
      console.error("Error creating alert:", error);
      setNoAlertsMessage("Failed to create alert. Please try again.");
    }
  };

  // Handle deleting an alert
  const handleDeleteAlert = async (alertId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/alerts/${currentCity}/${alertId}`
      );

      // Fetch updated alerts after deletion
      await fetchAlerts();
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  return (
    <div className="absolute top-5 lg:w-[1400px] lg:h-[500px] page-container bg-base-light/55 sm:md:ml-20 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Weather Alerts for {currentCity}
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Side - Alert Configuration */}
        <div className="h-[380px] overflow-y-auto pr-4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Notification Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-md"
                />
              </CardContent>
            </Card>

            {/* Other Weather Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Threshold Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={weatherCondition}
                  onValueChange={(val) => setWeatherCondition(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weather condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rain">Rain</SelectItem>
                    <SelectItem value="clear">Clear Sky</SelectItem>
                    <SelectItem value="clouds">Clouds</SelectItem>
                    <SelectItem value="snow">Snow</SelectItem>
                    <SelectItem value="thunderstorm">Thunderstorm</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center justify-between">
                  <Label>Alert Name</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="Enter alert name"
                      value={alertName}
                      onChange={(e) => setAlertName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>High Temperature</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="°C"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    <Label>Humidity</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="%"
                      value={humidity}
                      onChange={(e) => setHumidity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4" />
                    <Label>Wind Speed</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="km/h"
                      value={windSpeed}
                      onChange={(e) => setWindSpeed(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    <Label>Cloud Coverage</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      className="w-20"
                      placeholder="%"
                      value={cloudCoverage}
                      onChange={(e) => setCloudCoverage(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-red-500" onClick={handleCreateAlert}>
              Create New Alert
            </Button>
          </div>
        </div>

        {/* Right Side - Existing Alerts */}
        <div className="h-[380px] overflow-y-auto">
          <div className="space-y-4">
            {existingAlerts && existingAlerts.length > 0 ? (
              existingAlerts.map((alert) => (
                <Card key={alert._id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-red-500" />
                          {alert.type === "temperature" && (
                            <Thermometer className="h-4 w-4" />
                          )}
                          {alert.type === "humidity" && (
                            <Droplets className="h-4 w-4" />
                          )}
                          {alert.type === "wind" && (
                            <Wind className="h-4 w-4" />
                          )}
                          <span className="font-medium capitalize">
                            {alert.alertName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            {alert.condition} {alert.value}
                          </Badge>
                          <span className="text-sm text-slate-500">
                            Created:{" "}
                            {new Date(alert.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteAlert(alert._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center text-sm text-gray-500">
                {noAlertsMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
