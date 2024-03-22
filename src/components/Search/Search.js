import SearchForm from "../SearchForm/SearchForm.js";

function Search() {
  return (
    <div className="search">
      <div className="search__container">
        <h2 className="search__title">What's going on in the world?</h2>
        <p className="search__explaination">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>
      <SearchForm />
    </div>
  );
}

export default Search;
