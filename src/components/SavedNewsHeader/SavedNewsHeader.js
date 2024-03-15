import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedCardsContext from "../../contexts/SavedCardsContext";
import Navigation from "../Navigation/Navigation";
import React, { useContext } from "react";

function SavedNewsHeader() {
  const { saveCards } = useContext(SavedCardsContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="saved-news__header">
      <Navigation />
      <h2 className="saved-news__title">Saved Articles</h2>
      <h3 className="saved-news__article-count">
        {currentUser}, you have {saveCards.length} saved articles
      </h3>
      <p className="saved-news__keywords">By keywords: </p>
    </div>
  );
}

export default SavedNewsHeader;
