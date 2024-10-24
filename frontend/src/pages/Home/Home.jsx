import React, { useEffect, useState, useMemo, Suspense } from "react";
import "#/Home.css";
import Scenario from "@/components/Scenario/scenario";
import Carousel from "@/components/Carousel/Carousel";
import DayNightToggle from "@/components/DayNightToggle/DayNightToggle";
import SunAnimation from "@/components/SunAnimation/SunAnimation";
import VerticalSlider from "@/components/VerticalSlider/VerticalSlider";
import { AnimatePresence, motion } from "framer-motion";
import {
  TemperatureIcon,
  CalendarIcon,
  AlertIcon,
  SummaryIcon,
} from "@/components/Icons/Icons";
import SummaryPage from "../SummaryPage/Summary";

// Lazy loaded components
const ForecastPage = React.lazy(() => import("../ForecastPage/ForecastPage"));
const TemperaturePage = React.lazy(() =>
  import("../TemperaturePage/TemperaturePage")
);
const AlertsPage = React.lazy(() => import("../AlertsPage/AlertsPage"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[500px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
);

const Home_page = ({ userPreferences }) => {
  const [isNight, setIsNight] = useState(null);
  const [currentCity, setCurrentCity] = useState("Delhi");
  const [selectedOption, setSelectedOption] = useState(1);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_APP_OPEN_API;

  const fetchWeather = async (currentCity) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(currentCity);

    const intervalId = setInterval(() => {
      fetchWeather(currentCity);
    }, 300000);

    return () => clearInterval(intervalId);
  }, [currentCity]);

  const options = useMemo(
    () => [
      {
        icon: <CalendarIcon isNight={isNight} />,
        label: "Previous Days",
        page: (
          <Suspense fallback={<LoadingFallback />}>
            <ForecastPage isNight={isNight} weatherData={weatherData} />
          </Suspense>
        ),
      },
      {
        icon: <TemperatureIcon isNight={isNight} />,
        label: "Temperature",
        page: (
          <Suspense fallback={<LoadingFallback />}>
            <TemperaturePage
              isNight={isNight}
              weatherData={weatherData}
              userPreferences={userPreferences}
            />
          </Suspense>
        ),
      },
      {
        icon: <SummaryIcon isNight={isNight} />,
        label: "Summary",
        page: (
          <Suspense fallback={<LoadingFallback />}>
            <SummaryPage isNight={isNight} />
          </Suspense>
        ),
      },
      {
        icon: <AlertIcon isNight={isNight} />,
        label: "Alerts",
        page: (
          <Suspense fallback={<LoadingFallback />}>
            <AlertsPage isNight={isNight} />
          </Suspense>
        ),
      },
    ],
    [isNight, weatherData, userPreferences]
  );

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 0,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      scale: 0.98,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  useEffect(() => {
    const isItNight = () => {
      const now = new Date();
      const hours = now.getHours();
      return hours >= 18 || hours < 6;
    };
    setIsNight(isItNight());
  }, []);

  useEffect(() => {
    // This effect will only run when isNight is not null
    if (isNight !== null) {
      // Toggle the day/night mode
      document.documentElement.classList.toggle("container-night", isNight);
      document
        .querySelector(".sky-night")
        .classList.toggle("sky-night-fade", isNight);
      document
        .querySelectorAll("p, h1")
        .forEach((el) => el.classList.toggle("text-color", isNight));
      document
        .querySelector(".ocean-night")
        .classList.toggle("ocean-night-fade", isNight);
      document.querySelector(".moon").classList.toggle("moon-fade", isNight);
      document
        .querySelector(".ocean")
        .classList.toggle("animation-stop", isNight);
      document
        .querySelectorAll(".bird")
        .forEach((el) => el.classList.toggle("birds-fly", isNight));
      document.querySelector(".boat").classList.toggle("boat-sail", isNight);
      document
        .querySelectorAll(".mountain-top, .mountain-top > *")
        .forEach((el) => el.classList.toggle("mountain-top-night", isNight));
      document
        .querySelectorAll(".mountain-middle, .mountain-middle > *")
        .forEach((el) => el.classList.toggle("mountain-middle-night", isNight));
      document
        .querySelectorAll(".mountain-back, .mountain-back > *")
        .forEach((el) => el.classList.toggle("mountain-back-night", isNight));
      document.querySelector(".stars").classList.toggle("stars-fade", isNight);
      document
        .querySelector(".shooting-star")
        .classList.toggle("shooting", isNight);
    }
  }, [isNight]);

  const toggleDayNight = () => {
    document.querySelector(".sun").click();
  };

  const handleCityClick = (city) => {
    setCurrentCity(city);
    console.log("New City:", city);
  };

  return (
    <div className="home-container">
      <div className="background-scenario">
        <Scenario />
      </div>
      <div className="content">
        {/* Toggle Button for Day/Night */}
        <DayNightToggle isNight={isNight} toggleDayNight={toggleDayNight} />

        {/* Sun Animation Logic */}
        <SunAnimation isNight={isNight} setIsNight={setIsNight} />

        {/* City Carousel */}
        <Carousel
          isNight={isNight}
          currentCity={currentCity}
          handleCityClick={handleCityClick}
        />

        <VerticalSlider
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isNight={isNight}
        />

        {/* Animate presence for smooth transition */}
        <div className="page-content">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={selectedOption}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {options[selectedOption].page}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home_page;
