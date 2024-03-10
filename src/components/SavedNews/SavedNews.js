import "./SavedNews.css";
import React, { useContext } from "react";
import NewsCardsList from "../NewsCardsList/NewsCardsList";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

const SavedNews = ({
  windowWidth,
  onCreateMenu,
  savedCards,
  logout,
  searchKeyword,
  onDeleteCard,
  linksArray,
}) => {
  const keywords = savedCards.flatMap((card) =>
    card.keyword.split(/\s+/).join(", ")
  );

  function countAndSort(words) {
    const wordCounts = {};
    words.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
    const wordCountArray = Object.entries(wordCounts).map(([word, count]) => [
      word,
      count,
    ]);
    wordCountArray.sort((a, b) => b.count - a.count);
    return wordCountArray;
  }

  const sortedKeywords = countAndSort(keywords);
  const usableKeywords = sortedKeywords.map(([keyword]) => keyword);
  const sliceSortedKeywords = `${usableKeywords.slice(0, 2).join(", ")} and ${
    usableKeywords.length - 2
  } more`;

  const numberOfCards = savedCards.length;
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="saved">
      <SavedNewsHeader
        windowWidth={windowWidth}
        onCreateMenu={onCreateMenu}
        logout={logout}
      />
      <div className="saved__section">
        <div className="saved__header">
          <p className="saved__articles">Saved articles</p>
          <h2 className="saved__note">{`${currentUser.name}, you have ${numberOfCards} saved articles`}</h2>
          <p className="saved__keywords">
            By keywords:
            <span className="saved__span">
              {usableKeywords.length < 4 ? usableKeywords : sliceSortedKeywords}
            </span>
          </p>
        </div>
      </div>
      <div className="saved__cards">
        <NewsCardsList
          cardsData={savedCards}
          searchKeyword={searchKeyword}
          onDeleteCard={onDeleteCard}
          linksArray={linksArray}
        />
      </div>
      <Footer />
    </div>
  );
};

export default SavedNews;
