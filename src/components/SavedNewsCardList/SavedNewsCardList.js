import NewsCard from "../NewsCard/NewsCard";
import { newsOptions } from "../../utils/constants";

function SavedNewsCardList() {
  return (
    <section className="saved-news__card">
      <div className="saved-news__card-container">
        {newsOptions.map((news) => {
          return <NewsCard key={news.url} newsItem={news} />;
        })}
      </div>
    </section>
  );
}

export default SavedNewsCardList;
