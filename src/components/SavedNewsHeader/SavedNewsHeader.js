import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedCardsContext from "../../contexts/SavedCardsContext";
import Navigation from "../Navigation/Navigation";
import React, { useContext, useEffect } from "react";

function SavedNewsHeader({ onSignoutClick }) {
  const { savedCards } = useContext(SavedCardsContext);
  const { currentUser } = useContext(CurrentUserContext);

  const userArticles = savedCards.filter(
    (article) => article.owner === currentUser._id
  );
  const keywordsArray = userArticles.map((card) => card.keyword);

  const getKeywordString = (data) => {
    if (keywordsArray.length === 1) {
      return `${keywordsArray[0]}`;
    }

    if (keywordsArray.length > 1) {
      const count = {};

      for (const keyword of data) {
        if (count[keyword]) {
          count[keyword]++;
        } else {
          count[keyword] = 1;
        }
      }

      console.log(count);

      const savedKeywords = [];
      for (const item in count) {
        savedKeywords.push([item, count[item]]);
      }

      savedKeywords.sort((a, b) => {
        return b[1] - a[1];
      });

      if (savedKeywords.length === 1) {
        return `${savedKeywords[0][0]}`;
      } else if (savedKeywords.length === 2) {
        return `${savedKeywords[0][0]} and ${savedKeywords[1][0]}`;
      } else {
        return `${savedKeywords[0][0]}, ${savedKeywords[1][0]}, and ${
          savedKeywords.length - 2
        } more`;
      }
    } else {
      return null;
    }
  };

  const keywordsString = getKeywordString(keywordsArray);

  return (
    <div className="saved-news__header">
      <Navigation onSignoutClick={onSignoutClick} />
      <h2 className="saved-news__title">Saved Articles</h2>
      <h3 className="saved-news__article-count">
        {currentUser.name}, you have {userArticles.length} saved articles
      </h3>
      <p className="saved-news__keywords">
        By keywords:{" "}
        <span className="saved-news__keywords_bold">{keywordsString}</span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
