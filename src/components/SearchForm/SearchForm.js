import React, { useContext } from "react";
import NewsSearchContext from "../../contexts/NewsSearchContext";
import HasSearchedContext from "../../contexts/HasSearchedContext";
import KeywordsContext from "../../contexts/KeywordsContext";
import { useForm } from "../hooks/useForm";

function SearchForm() {
  const { handleNewsSearch } = useContext(NewsSearchContext);
  const { setHasSearched } = useContext(HasSearchedContext);
  const { setKeyword } = useContext(KeywordsContext);
  const { values, setValues, handleChange } = useForm({ search: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewsSearch(values.search);
    setHasSearched(true);
    setKeyword(values.search);
    setValues({ search: "" });
  };

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <input
        className="search__input"
        type="text"
        placeholder="Enter Topic"
        minLength={2}
        maxLength={30}
        name="search"
        value={values.search}
        onChange={handleChange}
        required
      />
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
