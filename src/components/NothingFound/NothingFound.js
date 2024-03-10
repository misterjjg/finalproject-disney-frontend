import "./NothingFound.css";
import React from "react";
import nothing from "../../images/Nothing.svg";

const NothingFound = () => {
  return (
    <div className="nothing">
      <img src={nothing} alt="nothing" />
      <p className="nothing__title">Nothing found</p>
      <p className="nothing__paragraph">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
};

export default NothingFound;
