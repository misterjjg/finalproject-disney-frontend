import "./NewsCard.css";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedCardsContext } from "../../contexts/SavedCardsContext";
import bookMark from "../../images/Bookmark.svg";
import bookMarkSaved from "../../images/Bookmark-saved.svg";
import bookMarkHover from "../../images/Bookmark-hover.svg";

const NewsCard = (props) => {
  const location = useLocation();

  const [currentCard, setCurrentCard] = useState({});

  const [isHovered, setHover] = useState(false);

  const { currentUser } = useContext(CurrentUserContext);

  const { savedCardsState } = useContext(SavedCardsContext);

  const [isSaved, setIsSaved] = useState(
    savedCardsState
      ? savedCardsState?.some((item) => title === item.title)
      : false
  );

  const keyWordToShow = savedCardsState?.find(
    (item) => item?.props?.title === title
  );

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentCard(props);
    } else setCurrentCard(props);
  }, [location, props]);
  const {
    source,
    title,
    publishedAt,
    description,
    urlToImage,
    checkSaveStatus,
  } = currentCard;

  useEffect(
    () =>
      setIsSaved(savedCardsState?.some((item) => title === item.props.title)),
    [savedCardsState, title]
  );

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  console.log(isHovered);

  return (
    <div className="card">
      {location.pathname === "/" ? (
        <div
          className="card__save-button-container"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className={
              !currentUser.email & isHovered
                ? `card__save-button-message-container`
                : `card__save-button-message-container-hidden`
            }
          >
            <p className={`card__save-button-message`}>
              Sign in to save articles
            </p>
          </div>
          <button className="card__save-button">
            {isSaved && currentUser.email && location.pathname === "/" ? (
              <img
                className="card__save-button-image"
                src={bookMarkSaved}
                alt="save-button"
                onClick={() => {
                  currentUser.email && checkSaveStatus({ ...props });
                }}
              />
            ) : (
              <div
                onMouseEnter={() => currentUser.email && setHover(true)}
                onMouseLeave={() => currentUser.email && setHover(false)}
              >
                <img
                  className="card__save-button-image"
                  src={isHovered ? bookMarkHover : bookMark}
                  alt="save-button"
                  onClick={() => {
                    currentUser.email && checkSaveStatus({ ...props });
                  }}
                />
              </div>
            )}
          </button>
        </div>
      ) : (
        <>
          <div className="card__keyword">
            <p className="card__keyword-title">{keyWordToShow?.keyword}</p>
          </div>
          <div
            className="card__save-button-container"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={
                currentUser.email && isHovered
                  ? `card__save-button-message-container`
                  : `card__save-button-message-container-hidden`
              }
            >
              <p className={`card__save-button-message`}>Remove from saved</p>
            </div>
            <button className="card__save-button">
              <img
                className="card__save-button-image"
                src={trash}
                alt="save-button"
                onClick={() => {
                  checkSaveStatus({ ...props });
                }}
              />
            </button>
          </div>
        </>
      )}

      <img className="card__image" src={urlToImage} alt="card" />
      <div className="card__info">
        <h2 className="card__publish-date">{formatDate(publishedAt)}</h2>
        <div className="card__title-padding">
          <p className="card__title">{title}</p>
        </div>
        <p className="card__description">{description}</p>

        <p className="card__source">{source?.name}</p>
      </div>
    </div>
  );
};

export default NewsCard;
