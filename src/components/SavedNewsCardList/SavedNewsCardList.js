import { useContext } from "react";
import NewsCard from "../NewsCard/NewsCard";
import SavedCardsContext from "../../contexts/SavedCardsContext";

function SavedNewsCardList() {
  const { savedCards } = useContext(SavedCardsContext);

  return (
    <section className="saved-news__card">
      <div className="saved-news__card-container">
        {savedCards.map((news) => {
          return <NewsCard key={news.link} newsItem={news} />;
        })}
      </div>
    </section>
  );
}

export default SavedNewsCardList;
