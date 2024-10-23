import React from "react";
import "#/transition.css";

const AirQualityCard = ({
  data = {
    pm25: 32,
    so2: 0.71,
    no2: 4.2,
    o3: 31.5,
  },
  containerClass,
  isLoading = false, // Add isLoading prop with default value
}) => {
  // Handle case where data might be null or undefined
  const airQualityData = data || {
    pm25: 32,
    so2: 0.71,
    no2: 4.2,
    o3: 31.5,
  };

  // Function to determine AQI status and color
  const getAQIStatus = (pm25) => {
    if (pm25 <= 12) return { status: "Good", color: "bg-green-500" };
    if (pm25 <= 35.4) return { status: "Fair", color: "bg-yellow-500" };
    return { status: "Poor", color: "bg-red-500" };
  };

  const { status, color } = getAQIStatus(airQualityData.pm25);

  // Loading metric box component
  const LoadingMetricBox = ({ label }) => (
    <div className="flex flex-col items-center">
      <div className="text-sm">{label}</div>
      <div className="h-8 w-16 mt-1 bg-gray-200 animate-pulse rounded"></div>
    </div>
  );

  // Regular metric box component
  const MetricBox = ({ label, value }) => (
    <div className="flex flex-col items-center">
      <div className="text-sm">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );

  return (
    <div className={`${containerClass} max-w-sm xl:max-w-lg rounded-lg shadow-lg p-6`}>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12" />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">Air Quality Index</h2>
        <span>
          <svg
            className="w-6 h-6"
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
        {isLoading ? (
          <>
            <LoadingMetricBox label="PM ₂.₅" />
            <LoadingMetricBox label="SO₂" />
            <LoadingMetricBox label="NO₂" />
            <LoadingMetricBox label="O₃" />
          </>
        ) : (
          <>
            <MetricBox label="PM ₂.₅" value={airQualityData.pm25} />
            <MetricBox label="SO₂" value={airQualityData.so2} />
            <MetricBox label="NO₂" value={airQualityData.no2} />
            <MetricBox label="O₃" value={airQualityData.o3} />
          </>
        )}
      </div>
    </div>
  );
};

export default AirQualityCard;