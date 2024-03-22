import React, { useContext } from "react";
import "./Preloader.css";
import IsLoadingContext from "../../contexts/IsLoadingContext";

function Preloader() {
  const { isLoading } = useContext(IsLoadingContext);
  return (
    <div
      className={`circle-preloader__container ${
        !isLoading ? "circle-preloader__hidden" : ""
      }`}
    >
      <div className="circle-preloader"></div>
      <p className="circle-preloader__description">Searching for news...</p>
    </div>
  );
}

export default Preloader;
