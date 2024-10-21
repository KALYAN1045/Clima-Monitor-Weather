import React, { useState } from "react";
import { motion } from "framer-motion";


const VerticalSlider = ({ options, selectedOption, setSelectedOption }) => {
  return (
    <div
      className="fixed top-1/2 left-[40px] transform -translate-y-1/2 flex flex-col space-y-[-40px]"
      style={{ zIndex: 1000 }} // Optional: Adjust z-index if needed
    >
      {options.map((option, index) => (
        <motion.div
          key={index}
          className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
            index === selectedOption
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-500 opacity-50"
          }`}
          initial={{ y: (index - selectedOption) * 80 }}
          animate={{ y: (index - selectedOption) * 80 }}
          transition={{
            type: "tween", // Use 'tween' for a smoother animation
            ease: "easeOut", // Smooth easing
            duration: 0.6,
          }}
          onClick={() => setSelectedOption(index)}
        >
          {option.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default VerticalSlider;
