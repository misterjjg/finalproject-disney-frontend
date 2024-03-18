import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import TopBackground from "../../images/TopBackground.svg";

function Header({ onSigninClick, onSignoutClick }) {
  return (
    <header src={TopBackground} className="header">
      <Navigation
        onSigninClick={onSigninClick}
        onSignoutClick={onSignoutClick}
      />
      <Search />
    </header>
  );
}

export default Header;
