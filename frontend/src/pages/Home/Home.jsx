import React, { useEffect, useState } from "react";
import "./Home.css";
import Scenario from "@/components/Scenario/scenario";
import Carousel from "@/components/Carousel/Carousel";
import DayNightToggle from "@/components/DayNightToggle/DayNightToggle";
import SunAnimation from "@/components/SunAnimation/SunAnimation";
import VerticalSlider from "@/components/VerticalSlider/VerticalSlider";
import CalendarPage from "../CalendarPage/CalendarPage";
import TemperaturePage from "../Temperature/TemperaturePage";
import AlertsPage from "../AlertsPage/AlertsPage";
import { AnimatePresence, motion } from "framer-motion";

import {
  TemperatureIcon,
  CalendarIcon,
  AlertIcon,
} from "@/components/Icons/Icons";

const Home_page = () => {
  const [isNight, setIsNight] = useState(null);
  const [currentCity, setCurrentCity] = useState("Delhi");
  const [selectedOption, setSelectedOption] = useState(1);

  const options = [
    {
      icon: <CalendarIcon />,
      label: "Previous Days",
      page: <CalendarPage />,
    },
    {
      icon: <TemperatureIcon />,
      label: "Temperature",
      page: <TemperaturePage />,
    },
    {
      icon: <AlertIcon />,
      label: "Alerts",
      page: <AlertsPage />,
    },
  ];

  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 30,
        damping: 15,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
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
        <Carousel currentCity={currentCity} handleCityClick={handleCityClick} />

        <VerticalSlider
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
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
