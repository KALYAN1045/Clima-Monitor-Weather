import React, { useEffect } from "react";

const SunAnimation = ({ isNight, setIsNight }) => {
  useEffect(() => {
    // Add the original JavaScript logic here
    const sunContainer = document.querySelector(".sun-container");
    const sun = document.querySelector(".sun");

    const handleSunClick = (e) => {
      e.stopPropagation();

      setIsNight((isNight) => !isNight);
      document.documentElement.classList.toggle("container-night");
      document.querySelector(".sky-night").classList.toggle("sky-night-fade");
      document
        .querySelectorAll("p, h1")
        .forEach((el) => el.classList.toggle("text-color"));
      document
        .querySelector(".ocean-night")
        .classList.toggle("ocean-night-fade");
      document.querySelector(".moon").classList.toggle("moon-fade");
      document.querySelector(".ocean").classList.toggle("animation-stop");
      document
        .querySelectorAll(".bird")
        .forEach((el) => el.classList.toggle("birds-fly"));
      document.querySelector(".boat").classList.toggle("boat-sail");
      document
        .querySelectorAll(".mountain-top, .mountain-top > *")
        .forEach((el) => el.classList.toggle("mountain-top-night"));
      document
        .querySelectorAll(".mountain-middle, .mountain-middle > *")
        .forEach((el) => el.classList.toggle("mountain-middle-night"));
      document
        .querySelectorAll(".mountain-back, .mountain-back > *")
        .forEach((el) => el.classList.toggle("mountain-back-night"));

      setTimeout(
        () =>
          document
            .querySelectorAll(".cloud")
            .forEach(
              (el) =>
                (el.style.display = el.style.display === "none" ? "" : "none")
            ),
        2500
      );
      document.querySelector(".stars").classList.toggle("stars-fade");
      document.querySelector(".shooting-star").classList.toggle("shooting");

      const angle = sunContainer.dataset.angle
        ? parseInt(sunContainer.dataset.angle) + 360
        : 360;
      sunContainer.style.transform = `rotate(${angle}deg)`;
      sunContainer.dataset.angle = angle.toString();
    };

    sun.addEventListener("click", handleSunClick);

    const isItNight = () => {
      const now = new Date();
      const hours = now.getHours();
      return hours >= 18 || hours < 6;
    };
    setIsNight(isItNight());

    return () => {
      sun.removeEventListener("click", handleSunClick);
    };
  }, []);

  return null;
};

export default SunAnimation;
