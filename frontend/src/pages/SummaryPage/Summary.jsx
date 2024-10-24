import React from "react";
import { useMemo, useState } from "react";
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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const WeatherAnalyticsDashboard = ({ weeklyData }) => {
  // Existing data processing code remains the same
  const dailyAggregates = useMemo(() => {
    return weeklyData.reduce((acc, day) => {
      const date = new Date(day.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          temps: [],
          conditions: [],
          windSpeeds: [],
        };
      }

      acc[date].temps.push(day.main.temp);
      acc[date].conditions.push(day.weather[0].main);
      acc[date].windSpeeds.push(day.wind.speed);

      return acc;
    }, {});
  }, [weeklyData]);

  const chartData = useMemo(() => {
    return Object.entries(dailyAggregates).map(([date, data]) => ({
      date,
      avgTemp: data.temps.reduce((a, b) => a + b, 0) / data.temps.length,
      maxTemp: Math.max(...data.temps),
      minTemp: Math.min(...data.temps),
      dominantCondition: mode(data.conditions),
      avgWindSpeed:
        data.windSpeeds.reduce((a, b) => a + b, 0) / data.windSpeeds.length,
    }));
  }, [dailyAggregates]);

  const weeklyStats = useMemo(() => {
    const allTemps = weeklyData.map((d) => d.main.temp);
    const allConditions = weeklyData.map((d) => d.weather[0].main);

    return {
      avgTemp: mean(allTemps),
      maxTemp: Math.max(...allTemps),
      minTemp: Math.min(...allTemps),
      dominantCondition: mode(allConditions),
    };
  }, [weeklyData]);

  const colors = {
    temp: "#ff7e67",
    wind: "#38d39f",
    clear: "#4facfe",
    rain: "#2998ff",
    clouds: "#b8b8b8",
    snow: "#e3e3e3",
  };

  return (
    <div className="p-4">
      {/* Top row of small stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="h-24">
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2">Avg Temp</div>
            <div className="text-2xl font-bold">
              {weeklyStats.avgTemp.toFixed(1)}°
            </div>
          </CardContent>
        </Card>

        <Card className="h-24">
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2">Min Temp</div>
            <div className="text-2xl font-bold">
              {weeklyStats.minTemp.toFixed(1)}°
            </div>
          </CardContent>
        </Card>

        <Card className="h-24">
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2">Max Temp</div>
            <div className="text-2xl font-bold">
              {weeklyStats.maxTemp.toFixed(1)}°
            </div>
          </CardContent>
        </Card>

        <Card className="h-24">
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2">Dominant</div>
            <div className="text-xl font-bold">
              {weeklyStats.dominantCondition}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section with temperature chart and right column */}
      <div className="grid grid-cols-12 gap-4">
        {/* Temperature chart taking 5 columns */}
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
                    stroke={colors.temp}
                    fill={colors.temp}
                    fillOpacity={0.2}
                    name="Max Temperature"
                  />
                  <Area
                    type="monotone"
                    dataKey="minTemp"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.2}
                    name="Min Temperature"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Right column taking 2 columns */}
        <div className="col-span-3 space-y-4">
          {/* Weather distribution */}
          <Card className="h-[300px]">
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Weather Distribution</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={Object.entries(
                      weeklyData.reduce((acc, day) => {
                        const condition = day.weather[0].main;
                        acc[condition] = (acc[condition] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([name, value]) => ({ name, value }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {Object.entries(colors).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry[1]} />
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

// Utility functions
const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const mode = (arr) => {
  const counts = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
};


const SummaryPage = () => {

  const weeklyData = [
    {
      dt: 1729708185,
      main: { temp: 11.4 },
      weather: [{ main: "Clear" }],
      wind: { speed: 2.7 },
      rain: { "3h": 0 },
    },
    {
      dt: 1729621785,
      main: { temp: 25.5 },
      weather: [{ main: "Snow" }],
      wind: { speed: 1.3 },
      rain: { "3h": 0.3 },
    },
    {
      dt: 1729535385,
      main: { temp: 21.1 },
      weather: [{ main: "Rain" }],
      wind: { speed: 1.2 },
      rain: { "3h": 0 },
    },
    {
      dt: 1729448985,
      main: { temp: 11.0 },
      weather: [{ main: "Snow" }],
      wind: { speed: 5.2 },
      rain: { "3h": 0 },
    },
    {
      dt: 1729362585,
      main: { temp: 18.7 },
      weather: [{ main: "Mist" }],
      wind: { speed: 7.3 },
      rain: { "3h": 0 },
    },
    {
      dt: 1729276185,
      main: { temp: 27.9 },
      weather: [{ main: "Rain" }],
      wind: { speed: 3.9 },
      rain: { "3h": 2.0 },
    },
    {
      dt: 1729189785,
      main: { temp: 18.2 },
      weather: [{ main: "Mist" }],
      wind: { speed: 6.2 },
      rain: { "3h": 9.8 },
    },
  ];

  return (
    <div className="absolute top-5 page-container bg-base-light/55 sm:md:ml-20 p-6 w-[1400px]">
      <WeatherAnalyticsDashboard weeklyData={weeklyData} />
    </div>
  );
};

export default SummaryPage;
