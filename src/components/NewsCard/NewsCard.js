import "./NewsCard.css";
import React, { useState, useContext } from "react";
import CurrentPageContext from "../../contexts/CurrentPageContext.js";
import SavedCardsContext from "../../contexts/SavedCardsContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Api from "../../utils/api.js";
import KeywordsContext from "../../contexts/KeywordsContext.js";

function NewsCard({ newsItem }) {
  const { currentPage } = useContext(CurrentPageContext);
  const { savedCards, setSavedCards } = useContext(SavedCardsContext);
  const { isLoggedIn } = useContext(CurrentUserContext);
  const [hover, setHover] = useState(false);
  const isSaved = savedCards.some((card) => card.link === newsItem.url);
  const cardSavedButtonClassname = `newscard__save ${
    isSaved ? "newscard__save_active" : "card__save_inactive"
  }`;
  const publishedAt = new Date(
    newsItem.publishedAt || newsItem.date
  ).toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSaveCard = () => {
    const token = localStorage.getItem("jwt");
    if (!savedCards.some((card) => card.link === newsItem.url)) {
      Api.saveNews(newsItem, token, keyword).then((data) => {
        // debugger;
        setSavedCards([data.data, ...savedCards]);
      });
    } else if (savedCards.some((card) => card.link === newsItem.url)) {
      console.log("Article already saved");
      window.alert("Article already saved");
    }
  };

  const handleDeleteCard = () => {
    const token = localStorage.getItem("jwt");
    Api.deleteSave(newsItem._id, token).then(() => {
      // savedCards.splice(
      //   savedCards.findIndex(
      //     (card) => card.link === newsItem.link || card.link === newsItem.url
      //   ),
      //   1
      // );
      savedCards.filter((card) => {
        // include card if card's id !== newsItem._id
        if (card._id !== newsItem._id) {
        }
      });
    });
  };

  return (
    <div className="newscard">
      <img
        src={newsItem.urlToImage || newsItem.image}
        alt={"News Article"}
        className="newscard__image"
      />
      <div className="newscard__description-container">
        <h4 className="newscard__date">{publishedAt}</h4>
        <h3 className="newscard__title">{newsItem.title}</h3>
        <p className="newscard__description">
          {newsItem.description || newsItem.text}
        </p>
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
            onClick={handleDeleteCard}
          ></button>
        ) : (
          <button
            className={cardSavedButtonClassname}
            type="button"
            onClick={handleSaveCard}
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
