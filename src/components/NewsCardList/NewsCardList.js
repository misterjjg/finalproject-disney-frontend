import NewsCard from "../NewsCard/NewsCard";
import React, { useContext, useState } from "react";
import notFoundImage from "../../images/Nothing.svg";
import HasSearchedContext from "../../contexts/HasSearchedContext";
import SearchResultContext from "../../contexts/SearchResultsContext";
import IsLoadingContext from "../../contexts/IsLoadingContext";
import Preloader from "../Preloader/Preloader";

function NewsCardList({ onSignup }) {
  const { hasSearched } = useContext(HasSearchedContext);
  const { searchResults } = useContext(SearchResultContext);
  const { isLoading } = useContext(IsLoadingContext);
  const [cardsVisible, setCardsVisible] = useState(3);

  return (
    <section className="card">
      {!isLoading && hasSearched && searchResults.length === 0 ? (
        <div className="card__not-found">
          <img
            src={notFoundImage}
            className="card__image_not-found"
            alt="not-found"
          />
          <h3 className="card__title_not-found">Not Found</h3>
          <p className="card__description_not-found">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
      ) : !isLoading && hasSearched && searchResults?.length >= 1 ? (
        <>
          <h3 className="card__results-title">Search Results</h3>
          <div className="card__container">
            {searchResults?.slice(0, cardsVisible).map((news) => {
              return (
                <NewsCard key={news.url} newsItem={news} onSignup={onSignup} />
              );
            })}
          </div>
          <button
            className="card__show-more"
            type="button"
            onClick={() => {
              setCardsVisible(cardsVisible + 3);
            }}
          >
            Show More
          </button>
        </>
      ) : isLoading ? (
        <Preloader />
      ) : (
        ""
      )}
    </section>
  );
}

export default NewsCardList;
