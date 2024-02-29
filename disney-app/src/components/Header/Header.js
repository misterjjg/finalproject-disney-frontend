import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/mickey-mouse-ears.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ onLoginModal, onRegisterModal, loggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const avatar = currentUser ? currentUser.avatar : undefined;
  const showAvatar = avatar !== "" ? true : false;
  const name = currentUser.name;

  return (
    <header className="header">
      <div className="header__menu-left">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="Mickey Ears" className="header__logo-image" />
          </Link>
        </div>
      </div>
      {loggedIn ? (
        <div className="header__menu-right">
          <Link className="header__name" to="/profile">
            {currentUser.name}
          </Link>
          <div>
            {showAvatar ? (
              <img src={avatar} alt="Avatar Logo" className="header__avatar" />
            ) : (
              <p className="header__avatar-placeholder">
                {name[0]?.toUpperCase()}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="header__menu-right">
          <div className="header__menu-buttons">
            <button
              className="header__add-button"
              onClick={onRegisterModal}
              type="text"
            >
              Sign Up
            </button>

            <button
              className="header__add-button"
              onClick={onLoginModal}
              type="text"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
