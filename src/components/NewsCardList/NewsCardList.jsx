import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NewsCardList = ({ children, cards, error, checkSaveStatus }) => {
  const location = useLocation();

  const [numberOfCards, setNumberOfCards] = useState(3);

  const [cardsToRender, setCardsToRender] = useState([{}]);

  useEffect(() => {
    if (location.pathname === "/") {
      setCardsToRender(cards);
    } else {
      console.log("saved-news");
      let newCards = cards?.map((card) => card.props);
      setCardsToRender(newCards);
    }
  }, [cards, location]);

  return (
    <section className="card-list">
      <div className="card-list__content">
        {location.pathname === "/" ? (
          <h1 className="card-list__title">Search results</h1>
        ) : (
          <></>
        )}

        {children}
        {cards.length ? (
          <div className="card-list__container-button">
            {location.pathname === "/" ? (
              <>
                <div className="card-list__container">
                  {cardsToRender?.slice(0, numberOfCards).map((card, key) => (
                    <NewsCard
                      {...card}
                      key={key}
                      checkSaveStatus={checkSaveStatus}
                    />
                  ))}
                </div>
                <div className="card-list__more-button-container">
                  <button
                    onClick={() => setNumberOfCards(numberOfCards + 3)}
                    className="card-list__more-button"
                  >
                    Show more
                  </button>
                </div>
              </>
            ) : (
              <div className="card-list__container">
                {cardsToRender?.map((card, key) => (
                  <NewsCard
                    {...card}
                    key={key}
                    checkSaveStatus={checkSaveStatus}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          location.pathname === "/" && (
            <div className="card-list__container-button">
              {error ? (
                <h2 className="card-list__error card-list__title">
                  "Sorry, something went wrong during the request. There may be
                  a connection issue or the server may be down. Please try again
                  later."
                </h2>
              ) : (
                <h2 className="card-list__error card-list__title">
                  Sorry, but nothing matched your search terms.
                </h2>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default NewsCardList;
