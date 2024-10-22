import React from "react";
import { motion } from "framer-motion";

const VerticalSlider = ({ options, selectedOption, setSelectedOption, isNight }) => {
  return (
    <div
      className="fixed top-1/2 left-[40px] transform -translate-y-1/2 flex flex-col space-y-8"
      style={{ zIndex: 1000 }} // Optional: Adjust z-index if needed
    >
      {options.map((option, index) => (
        <motion.div
          key={index}
          className="relative w-12 h-12 flex items-center justify-center cursor-pointer"
          onClick={() => setSelectedOption(index)}
        >
          <motion.div
            className={`absolute w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
              index === selectedOption ? "bg-blue-light opacity-50" : ""
            }`}
            initial={{ scale: 1 }}
            animate={{
              scale: index === selectedOption ? 1.2 : 1,
              opacity: index === selectedOption ? 1 : 0.7,
            }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.3,
            }}
          />
          <div
            className={`z-10 ${
              index === selectedOption ? "text-white" : "text-gray-500"
            }`}
          >
            {option.icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VerticalSlider;
