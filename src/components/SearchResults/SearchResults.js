import "./SearchResults.css";
import React, { useState } from "react";
import NewsCardsList from "../NewsCardsList/NewsCardsList";

const SearchResults = ({
  cardsData,
  onLikeCard,
  loggedIn,
  searchKeyword,
  onCreateSignUp,
  linksArray,
  onDeleteCard,
}) => {
  const [visibleCards, setVisibleCards] = useState(3);
  const handleShowMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  return (
    <div className="results">
      <h2 className="results__title">Search results</h2>
      <NewsCardsList
        cardsData={cardsData}
        visibleCards={visibleCards}
        onLikeCard={onLikeCard}
        loggedIn={loggedIn}
        searchKeyword={searchKeyword}
        onCreateSignup={onCreateSignUp}
        linksArray={linksArray}
        onDeleteCard={onDeleteCard}
      />
      <div className="results__button">
        <button
          type="button"
          className={
            cardsData.length === visibleCards
              ? "results__button-text_hidden"
              : "results__button-text"
          }
          onClick={handleShowMore}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
