import "./SavedNewsInfo.css";
import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedCardsContext } from "../../contexts/SavedCardsContext";

const SavedNewsInfo = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedCardsState } = useContext(SavedCardsContext);
  const [keywordState, setKeywordState] = useState([]);

  useEffect(() => {
    const keywordList = savedCardsState
      .map((item) => item.keyword)
      .filter(
        (keyword, index, self) => self.findIndex((t) => t === keyword) === index
      );
    setKeywordState(keywordList);
  }, [savedCardsState]);

  const checkKeywords = () => {
    let keywordString = "";
    if (keywordState?.length === 0) keywordString += "None";
    if (keywordState?.length === 1) keywordString += keywordState[0];
    if (keywordState?.length === 2)
      keywordString += keywordState[0] + " and " + keywordState[1];
    if (keywordState?.length > 2) {
      keywordString += keywordState[0];
      keywordString += ", ";
      keywordString += keywordState[1];
      keywordString += " and ";
      keywordString += keywordState?.length - 2;
      keywordString += " more ";
    }
    return keywordString;
  };

  return (
    <section className="saved-news-page">
      <p className="saved-news-page__header">Saved articles</p>
      <div className="saved-news-page__description-container">
        <h1 className="saved-news-page__description">
          {currentUser?.email?.slice(0, 3).toUpperCase()}, you have{" "}
          {savedCardsState ? savedCardsState?.length : 0} saved articles
        </h1>
      </div>
      <div className="saved-news-page__conclusion">
        By keywords:{" "}
        <i className="saved-news-page__conclusion saved-news-page__conclusion-bold">
          {" "}
          {checkKeywords()}
        </i>
      </div>
    </section>
  );
};

export default SavedNewsInfo;
