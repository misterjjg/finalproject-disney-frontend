import "./NewsCard.css";
import React, { useState, useContext } from "react";
import CurrentPageContext from "../../contexts/CurrentPageContext.js";
import SavedCardsContext from "../../contexts/SavedCardsContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function NewsCard({ newsItem }) {
  const { currentPage } = useContext(CurrentPageContext);
  const { saveCards, setSavedCards } = useContext(SavedCardsContext);
  const { isLoggedIn } = useContext(CurrentUserContext);
  const [hover, setHover] = useState(false);
  const isSaved = saveCards.some((card) => card.title === newsItem.title);
  const publishedAt = new Date(newsItem.publishedAt).toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSaveCards = (e) => {
    setSavedCards();
  };

  return (
    <div className="newscard__item">
      <img
        src={newsItem.urlToImage}
        alt={newsItem.url}
        className="newscard__image"
      />
      <div className="newscard__description-container">
        <h4 className="newscard__date">{publishedAt}</h4>
        <h3 className="newscard__title">{newsItem.title}</h3>
        <p className="newscard__description">{newsItem.description}</p>
        <h4 className="newscard__publisher">
          {newsItem.source.name || newsItem.source}
        </h4>
      </div>
      <div className="newscard__save-btn-container">
        {currentPage === "/saved-news" ? (
          <button
            className="newscard__delete"
            type="button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          ></button>
        ) : (
          <button
            className={`newscard__save ${
              isSaved ? "newscard__save_active" : ""
            }`}
            type="button"
            onClick={handleSaveCards}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          ></button>
        )}
      </div>
      {hover && currentPage === "/saved-news" ? (
        <div className="newscard__warning_remove">
          <p className="newscard__warning">Remove from saved</p>
        </div>
      ) : hover && !isLoggedIn && currentPage === "/" ? (
        <div className="newscard__warning_signin">
          <p className="newscard__warning">Sign in to save articles</p>
        </div>
      ) : (
        ""
      )}
      {currentPage === "/saved-news" ? (
        <div className="newscard__keyword">{newsItem.keyword}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NewsCard;
