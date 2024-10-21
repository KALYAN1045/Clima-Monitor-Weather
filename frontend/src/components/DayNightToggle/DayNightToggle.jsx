import React from "react";
import { Sun, Moon } from "lucide-react";

const DayNightToggle = ({ isNight, toggleDayNight }) => {
  return (
    <button className="toggle-button" onClick={toggleDayNight}>
      {isNight ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default DayNightToggle;
