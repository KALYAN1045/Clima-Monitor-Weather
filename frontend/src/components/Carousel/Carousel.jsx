import React from "react";
import "#/Carousel.css";
import cities from "../cities/cities.js";

const Carousel = ({ isNight, currentCity, handleCityClick }) => {
  const themeClasses = {
    text: isNight ? "text-base-light" : "text-base-dark",
    container: isNight ? "bg-white/20" : "bg-white/30",
  };
  return (
    <>
      <div className={`${themeClasses.text} city-container`}>
        {cities.map((city, index) => (
          <div
            key={index}
            className={`city-item ${city.name === currentCity ? "active" : ""}`}
            onClick={() => handleCityClick(city.name)} // Handle city click here
          >
            <h1 className="city-name">{city.name}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
