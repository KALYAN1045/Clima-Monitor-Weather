import React, { lazy, Suspense, memo, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import "#/transition.css";
import { convertToIST } from "@/services/converttoIST";
import { useForecastData } from "@/hooks/useForecastData";

// Lightweight loading component with minimal animation
const LoadingPlaceholder = memo(() => (
  <Card className="w-full h-48 bg-base-light/30">
    <div className="animate-pulse-subtle h-full" />
  </Card>
));

// Chunk components more granularly
const FiveDayForecast = lazy(() =>
  import("@/components/weatherDashboard/FiveDayForecast").then((module) => ({
    default: memo(module.default),
  }))
);

const DailyForecast = lazy(() =>
  import("@/components/weatherDashboard/DailyForecast").then((module) => ({
    default: memo(module.default),
  }))
);

const AirQualityCard = lazy(() =>
  import("@/components/weatherDashboard/AirQuality").then((module) => ({
    default: memo(module.default),
  }))
);

const SunriseSunsetCard = lazy(() =>
  import("@/components/weatherDashboard/SunriseSunset").then((module) => ({
    default: memo(module.default),
  }))
);

// Preload critical components
const preloadComponents = () => {
  const preloadComponent = (importFn) => {
    try {
      importFn();
    } catch (e) {
      console.error("Preload failed:", e);
    }
  };

  preloadComponent(() =>
    import("@/components/weatherDashboard/FiveDayForecast")
  );
  preloadComponent(() => import("@/components/weatherDashboard/DailyForecast"));
};

const ForecastPage = ({ isNight, weatherData }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger preload on mount
  React.useEffect(() => {
    preloadComponents();
    setIsLoaded(true);
  }, []);

  // Memoize data to prevent unnecessary re-renders
  const [airQualityData, setAirQualityData] = useState(null);
  const API_KEY = import.meta.env.VITE_APP_OPEN_API;

  useEffect(() => {
    if (weatherData && weatherData.coord) {
      const { lat, lon } = weatherData.coord;

      const fetchAirQuality = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          );
          const data = await response.json();

          // Check if data exists and contains the expected structure
          if (data?.list?.[0]?.components) {
            const airQuality = {
              pm25: data.list[0].components.pm2_5 || "-", // Safely handle if pm2_5 is missing
              so2: data.list[0].components.so2 || "-",
              no2: data.list[0].components.no2 || "-",
              o3: data.list[0].components.o3 || "-",
            };

            setAirQualityData(airQuality);
          }
        } catch (error) {
          console.error("Error fetching air quality data:", error);
        }
      };

      fetchAirQuality();
    }
  }, [weatherData]);

  const sunriseSunsetData = React.useMemo(() => {
    const sunrise = weatherData.sys?.sunrise;
    const sunset = weatherData.sys?.sunset;

    return {
      sunrise: convertToIST(sunrise),
      sunset: convertToIST(sunset),
    };
  }, [weatherData]);

  const { forecastData, loading, error } = useForecastData(
    weatherData?.coord?.lat,
    weatherData?.coord?.lon,
    API_KEY
  );

  const containerClass = isNight ? "dark" : "light";

  // Optimize rendering with transition groups
  return (
    <div className="absolute top-5 page-container bg-base-light/55 sm:md:ml-20 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1800px] mx-auto">
        {/* Prioritize loading of main forecast */}
        <div className="lg:col-span-4">
          <Suspense fallback={<LoadingPlaceholder />}>
            {isLoaded && <FiveDayForecast containerClass={containerClass} forecastData={forecastData} />}
          </Suspense>
        </div>

        {/* Defer loading of secondary content */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-3">
          <Suspense fallback={<LoadingPlaceholder />}>
            {isLoaded && <DailyForecast containerClass={containerClass} forecastData={forecastData}/>}
          </Suspense>

          {/* Load supplementary cards last */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Suspense fallback={<LoadingPlaceholder />}>
              {isLoaded && (
                <AirQualityCard
                  data={airQualityData}
                  containerClass={containerClass}
                />
              )}
            </Suspense>
            <Suspense fallback={<LoadingPlaceholder />}>
              {isLoaded && (
                <SunriseSunsetCard
                  data={sunriseSunsetData}
                  containerClass={containerClass}
                />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export memoized component with display name for debugging
const MemoizedForecastPage = memo(ForecastPage);
MemoizedForecastPage.displayName = "ForecastPage";

export default MemoizedForecastPage;
