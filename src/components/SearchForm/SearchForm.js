import React, { useContext, useState } from "react";
import NewsSearchContext from "../../contexts/NewsSearchContext";
import HasSearchedContext from "../../contexts/HasSearchedContext";
import KeywordsContext from "../../contexts/KeywordsContext";

function SearchForm() {
  const { handleNewsSearch } = useContext(NewsSearchContext);
  const { setHasSearched } = useContext(HasSearchedContext);
  const { setKeyword } = useContext(KeywordsContext);
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewsSearch(searchInput);
    setHasSearched(true);
    setKeyword(searchInput);
    setSearchInput("");
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        placeholder="Enter Topic"
        minLength={2}
        maxLength={30}
        onChange={handleInputChange}
        required
      />
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
