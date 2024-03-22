import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.js";
import SavedNewsCardList from "../SavedNewsCardList/SavedNewsCardList.js";

function SavedNews() {
  return (
    <div className="saved-news">
      <SavedNewsHeader />
      <SavedNewsCardList />
    </div>
  );
}

export default SavedNews;
