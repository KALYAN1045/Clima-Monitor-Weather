// src/components/weatherDashboard/AirQuality.jsx
import React from "react";

const AirQualityCard = ({
  data = {
    pm25: 32,
    so2: 0.71,
    no2: 4.2,
    o3: 31.5,
  },
}) => {
  // Function to determine AQI status and color
  const getAQIStatus = (pm25) => {
    if (pm25 <= 12) return { status: "Good", color: "bg-green-500" };
    if (pm25 <= 35.4) return { status: "Fair", color: "bg-yellow-500" };
    return { status: "Poor", color: "bg-red-500" };
  };

  const { status, color } = getAQIStatus(data.pm25);

  return (
    <div className="max-w-sm xl:max-w-lg bg-blue-900 text-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-gray-300">Air Quality Index</h2>
        <span>
          <svg
            className="w-6 h-6 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S17.33 8 16.5 8H2v2h14.5c1.93 0 3.5-1.57 3.5-3.5zM18.5 11H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5v2c1.93 0 3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5z" />
          </svg>
        </span>
        <span className={`${color} px-3 py-1 rounded-full text-sm font-medium`}>
          {status}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* PM2.5 */}
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-300">PM ₂.₅</div>
          <div className="text-xl font-semibold">{data.pm25}</div>
        </div>

        {/* SO₂ */}
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-300">SO₂</div>
          <div className="text-xl font-semibold">{data.so2}</div>
        </div>

        {/* NO₂ */}
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-300">NO₂</div>
          <div className="text-xl font-semibold">{data.no2}</div>
        </div>

        {/* O₃ */}
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-300">O₃</div>
          <div className="text-xl font-semibold">{data.o3}</div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;
