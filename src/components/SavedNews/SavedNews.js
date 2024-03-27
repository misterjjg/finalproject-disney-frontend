import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.js";
import SavedNewsCardList from "../SavedNewsCardList/SavedNewsCardList.js";

function SavedNews({ onSignoutClick }) {
  return (
    <div className="saved-news">
      <SavedNewsHeader onSignoutClick={onSignoutClick} />
      <SavedNewsCardList />
    </div>
  );
}

export default SavedNews;
