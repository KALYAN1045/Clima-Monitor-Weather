import React from "react";
import FiveDayForecast from "@/components/weatherDashboard/FiveDayForecast";
import DailyForecast from "@/components/weatherDashboard/DailyForecast";
import AirQualityCard from "@/components/weatherDashboard/AirQuality";
import SunriseSunsetCard from "@/components/weatherDashboard/SunriseSunset";

const CalendarPage = () => {
  return (
    <div className="absolute top-5 page-container bg-base-light/55 sm:md:ml-20 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1800px] mx-auto">
        <div className="lg:col-span-4">
          <FiveDayForecast />
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 gap-3">
          <DailyForecast />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AirQualityCard
              data={{
                pm25: 10.3,
                so2: 0.71,
                no2: 4.2,
                o3: 31.5,
              }}
            />
            <SunriseSunsetCard
              data={{
                sunrise: "6:17 AM",
                sunset: "5:55 PM",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;