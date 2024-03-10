import "./NewsCardsList.css";
import NewsCard from "../NewsCard/NewsCard";
import React from "react";

const NewsCardsList = ({
  cardsData,
  visibleCards,
  onLikeCard,
  loggedIn,
  searchKeyword,
  onDeleteCard,
  onCreateSignUp,
  linksArray,
}) => {
  return (
    <ul className="cards">
      {cardsData.slice(0, visibleCards).map((card, index) => (
        <NewsCard
          key={index + 1}
          date={card.publishedAt || card.date}
          title={card.title}
          source={card.source}
          text={card.description || card.text}
          author={card.author}
          image={card.urlToImage || card.image}
          onLikeCard={onLikeCard}
          link={card.url || card.link}
          loggedIn={loggedIn}
          searchKeyword={searchKeyword || card.keyword}
          id={card._id}
          onDeleteCard={onDeleteCard}
          onCreateSignup={onCreateSignUp}
          linksArray={linksArray}
        />
      ))}
    </ul>
  );
};

export default NewsCardsList;
