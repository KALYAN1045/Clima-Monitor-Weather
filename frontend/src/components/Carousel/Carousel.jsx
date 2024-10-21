import React, { useState } from "react";
import "./Carousel.css";

// Define the cities and their corresponding names
const cities = [
  { name: "Delhi" },
  { name: "Mumbai" },
  { name: "Chennai" },
  { name: "Bangalore" },
  { name: "Kolkata" },
  { name: "Hyderabad" },
  { name: "Pune" },
];

const Carousel = ({ currentCity, handleCityClick }) => {
  return (
    <>
      <div className="city-container">
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
