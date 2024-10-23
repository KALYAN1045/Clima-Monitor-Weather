import React, { lazy, Suspense, memo, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import "#/transition.css";

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

const ForecastPage = ({ isNight }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger preload on mount
  React.useEffect(() => {
    preloadComponents();
    setIsLoaded(true);
  }, []);

  // Memoize data to prevent unnecessary re-renders
  const airQualityData = React.useMemo(
    () => ({
      pm25: 10.3,
      so2: 0.71,
      no2: 4.2,
      o3: 31.5,
    }),
    []
  );

  const sunriseSunsetData = React.useMemo(
    () => ({
      sunrise: "6:17 AM",
      sunset: "5:55 PM",
    }),
    []
  );

  const containerClass = isNight ? "dark" : "light";

  // Optimize rendering with transition groups
  return (
    <div className="absolute top-5 page-container bg-base-light/55 sm:md:ml-20 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1800px] mx-auto">
        {/* Prioritize loading of main forecast */}
        <div className="lg:col-span-4">
          <Suspense fallback={<LoadingPlaceholder />}>
            {isLoaded && <FiveDayForecast containerClass={containerClass}/>}
          </Suspense>
        </div>

        {/* Defer loading of secondary content */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-3">
          <Suspense fallback={<LoadingPlaceholder />}>
            {isLoaded && <DailyForecast containerClass={containerClass}/>}
          </Suspense>

          {/* Load supplementary cards last */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Suspense fallback={<LoadingPlaceholder />}>
              {isLoaded && <AirQualityCard data={airQualityData} containerClass={containerClass}/>}
            </Suspense>
            <Suspense fallback={<LoadingPlaceholder />}>
              {isLoaded && <SunriseSunsetCard data={sunriseSunsetData} containerClass={containerClass}/>}
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
