import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";

function Header({ onSigninClick, onSignoutClick }) {
  return (
    <header className="header">
      <Navigation
        onSigninClick={onSigninClick}
        onSignoutClick={onSignoutClick}
      />
      <Search />
    </header>
  );
}

export default Header;
