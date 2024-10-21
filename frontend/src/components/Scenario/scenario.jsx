import React from "react";

const Scenario = () => {
  return (
    <div className="rectangle-container">
      <div className="sky">
        <div className="sky-night">
          <div className="stars">
            <div className="shooting-star"></div>
            <div className="star-group-1"></div>
            <div className="star-group-2"></div>
            <div className="star-group-3"></div>
            <div className="star-group-4"></div>
          </div>
        </div>
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
        <div className="cloud cloud-6"></div>
        <div className="bird bird-1"></div>
        <div className="bird bird-2"></div>
        <div className="bird bird-3"></div>
      </div>

      <div className="mountains">
        <div className="mountain-back">
          <div className="mountain-back-1"></div>
          <div className="mountain-back-2"></div>
        </div>
        <div className="mountain-middle">
          <div className="mountain-middle-1"></div>
          <div className="mountain-middle-2"></div>
        </div>
        <div className="mountain-top">
          <div className="mountain-top-1"></div>
        </div>
      </div>

      <div className="sun-container">
        <div className="sun"></div>
      </div>

      <div className="ocean">
        <div className="boat"></div>
        <div className="ocean-night">
          <div className="moon"></div>
          <div className="mountains mountains-bottom">
            <div className="mountain-back">
              <div className="mountain-back-1"></div>
              <div className="mountain-back-2"></div>
            </div>
            <div className="mountain-middle">
              <div className="mountain-middle-1"></div>
              <div className="mountain-middle-2"></div>
            </div>
            <div className="mountain-top">
              <div className="mountain-top-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scenario;
