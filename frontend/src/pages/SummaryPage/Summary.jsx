import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

const WeatherAnalyticsDashboard = ({ currentCity }) => {
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    if (currentCity) {
      // Fetch daily and weekly data
      const fetchDailyData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API}/api/weather/daily/${currentCity}`
          );
          setDailyData(response.data.data);
        } catch (error) {
          console.error("Error fetching daily data:", error);
        }
      };

      const fetchWeeklyData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API}/api/weather/weekly/${currentCity}`
          );
          setWeeklyData(response.data.weekly);
        } catch (error) {
          console.error("Error fetching weekly data:", error);
        }
      };

      fetchDailyData();
      fetchWeeklyData();
    }
  }, [currentCity]);

  // Process weekly data into chart format with average temperature
  const chartData = useMemo(() => {
    return weeklyData.map((day) => ({
      date: new Date(day.date).toLocaleDateString(),
      avgTemp: day.avgTemp,
      minTemp: day.minTemp,
      maxTemp: day.maxTemp,
    }));
  }, [weeklyData]);

  // Calculate weather distribution from weekly data
  const weatherDistribution = useMemo(() => {
    const conditionCounts = weeklyData.reduce((acc, day) => {
      acc[day.dominantCondition] = (acc[day.dominantCondition] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(conditionCounts).map(([condition, value]) => ({
      name: condition,
      value,
    }));
  }, [weeklyData]);

  // Define colors for the charts
  const colors = {
    maxTemp: "#ff7e67",    // Warm red for max temperature
    minTemp: "#82ca9d",    // Cool green for min temperature
    avgTemp: "#ffd700",    // Gold for average temperature
    clear: "#4facfe",      // Light blue for clear sky
    haze: "#87ceeb", // Sky blue for partly cloudy
    clouds: "#b0c4de",     // Light steel blue for cloudy
    overcast: "#808080",   // Gray for overcast
    rain: "#2998ff",       // Blue for rain
    showers: "#4682b4",    // Steel blue for showers
    thunderstorm: "#ffcc00", // Yellow for thunderstorm
    snow: "#e3e3e3",       // Light gray for snow
    mist: "#d3d3d3",       // Light gray for mist
  };

  return (
    <div className="p-4">
      {/* Top row of small stat cards */}
      {dailyData && (
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card className="h-24">
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Avg Temp</div>
              <div className="text-2xl font-bold">
                {dailyData.avgTemp.toFixed(1)}°
              </div>
            </CardContent>
          </Card>

          <Card className="h-24">
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Min Temp</div>
              <div className="text-2xl font-bold">
                {dailyData.minTemp.toFixed(1)}°
              </div>
            </CardContent>
          </Card>

          <Card className="h-24">
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Max Temp</div>
              <div className="text-2xl font-bold">
                {dailyData.maxTemp.toFixed(1)}°
              </div>
            </CardContent>
          </Card>

          <Card className="h-24">
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Dominant</div>
              <div className="text-xl font-bold">
                {dailyData.dominantCondition}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom section with temperature chart and right column */}
      <div className="grid grid-cols-12 gap-4">
        {/* Temperature chart taking 9 columns */}
        <Card className="col-span-9">
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-4">Temperature Trends</div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="maxTemp"
                    stroke={colors.maxTemp}
                    fill={colors.maxTemp}
                    fillOpacity={0.2}
                    name="Max Temperature"
                  />
                  <Area
                    type="monotone"
                    dataKey="minTemp"
                    stroke={colors.minTemp}
                    fill={colors.minTemp}
                    fillOpacity={0.2}
                    name="Min Temperature"
                  />
                  {/* Added average temperature line */}
                  <Area
                    type="monotone"
                    dataKey="avgTemp"
                    stroke={colors.avgTemp}
                    fill={colors.avgTemp}
                    fillOpacity={0.2}
                    name="Average Temperature"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Right column taking 3 columns */}
        <div className="col-span-3 space-y-4">
          {/* Weather distribution */}
          <Card className="h-[300px]">
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">
                Weather Distribution
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={weatherDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {weatherDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[entry.name.toLowerCase().replace(/\s+/g, '')] || "#8884d8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SummaryPage = ({ currentCity }) => {
  return (
    <div className="absolute top-5 page-container bg-base-light/55 sm:md:ml-20 p-6 w-[1400px]">
      <WeatherAnalyticsDashboard currentCity={currentCity} />
    </div>
  );
};

export default SummaryPage;
