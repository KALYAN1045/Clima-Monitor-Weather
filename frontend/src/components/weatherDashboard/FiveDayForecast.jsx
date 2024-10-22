import React from 'react';
import { Card } from '@/components/ui/card';
import { Cloud, CloudSun, Sun } from 'lucide-react';

const FiveDayForecast = () => {
  const sampleForecast = [
    { day: "Thursday", date: "23 Oct", temp: 26, weather: "cloudy" },
    { day: "Friday", date: "24 Oct", temp: 25, weather: "cloudy" },
    { day: "Saturday", date: "25 Oct", temp: 24, weather: "cloudy" },
    { day: "Sunday", date: "26 Oct", temp: 25, weather: "partly-cloudy" },
    { day: "Monday", date: "27 Oct", temp: 26, weather: "sunny" },
  ];

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "sunny":
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case "partly-cloudy":
        return <CloudSun className="w-8 h-8 text-gray-300" />;
      case "cloudy":
      default:
        return <Cloud className="w-8 h-8 text-gray-300" />;
    }
  };

  return (
    <>
      <h2 className="text-white text-xl font-semibold mb-6">5 Days Forecast</h2>
      <div className="space-y-6">
        {sampleForecast.map((day) => (
          <div
            key={day.date}
            className="flex items-center justify-between bg-blue-900 p-4 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getWeatherIcon(day.weather)}
              <span className="text-white text-2xl font-medium">
                {day.temp}°
              </span>
            </div>
            <div className="w-24 text-center">
              <span className="text-gray-300 text-sm">{day.date}</span>
            </div>
            <div className="w-24 text-right">
              <span className="text-gray-300 text-sm">{day.day}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FiveDayForecast;