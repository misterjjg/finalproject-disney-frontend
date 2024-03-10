import "./SearchForm.css";
import React, { useState, useEffect } from "react";
import { apiKey } from "../../utils/constants";

const SearchForm = ({ windowWidth, onSearch, onSearchKeyword }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const currentDate = new Date();

    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    setStartDate(sevenDaysAgo.toISOString().split("T")[0]);
    setEndDate(currentDate.toISOString().split("T")[0]);
  }, []);

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const validSearch = /[a-zA-Z]/.test(inputValue);
    if (validSearch) {
      onSearch({
        userInput: inputValue,
        apiKey: apiKey,
        fromDate: startDate,
        toDate: endDate,
        pageSize: 100,
      });
      onSearchKeyword(inputValue);
    } else {
      setErrorMessage("Please enter a keyword");
    }
  };

  return windowWidth < 500 ? (
    <div className="search">
      <form className="search__window" onSubmit={handleSearchSubmit}>
        <input
          value={inputValue}
          className="search__window-input"
          type="text"
          placeholder="Enter topic"
          onChange={handleInputChange}
        />
        <button type="button" className="search__window-button">
          Search
        </button>
        <p
          className={
            errorMessage === "" ? "search__error-none" : "search__error"
          }
        >
          {errorMessage}
        </p>
      </form>
    </div>
  ) : (
    <form className="search" onSubmit={handleSearchSubmit}>
      <input
        value={inputValue}
        className="search__input"
        type="text"
        placeholder="Enter topic"
        onChange={handleInputChange}
      />
      <button type="submit" className="search__button">
        Search
      </button>
      <p
        className={errorMessage === "" ? "search__error-none" : "search__error"}
      >
        {errorMessage}
      </p>
    </form>
  );
};

export default SearchForm;
