import "./Header.css";
import logoutWhite from "../../images/Logout-white.svg";
import closeButton from "../../images/CloseButton.svg";
import menuWhite from "../../images/Menu-white.svg";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({
  onCreateSignIn,
  loggedIn,
  windowWidth,
  name,
  onCreateMenu,
  isOpen,
  onClose,
  logout,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

  return windowWidth < 500 ? (
    <div className="header">
      <header className={`header__section header__section_${name}`}>
        <Link to="/" className="header__links">
          <p className={isOpen ? `header__title-white` : `header__title`}>
            NewsExplorer
          </p>
        </Link>
        <button
          className="header__menu"
          type="button"
          onClick={isOpen ? onClose : onCreateMenu}
        >
          <img
            src={isOpen ? closeButton : menuWhite}
            alt="menu"
            className="header__menu-pic"
          />
        </button>
      </header>
    </div>
  ) : (
    <div className="header">
      <header className="header__section">
        <Link to="/" className="header__links">
          <p className="header__title">NewsExplorer</p>
        </Link>
        {loggedIn ? (
          <nav className="header__options">
            <p className="header__home">Home</p>
            <Link to="/savedarticles" className="header__links">
              <p className="header__articles">Saved articles</p>
            </Link>
            <button
              type="button"
              className="header__profile-button"
              onClick={logout}
            >
              <p className="header__name">{currentUser.name}</p>
              <div className="header__pic">
                <img
                  className="header__img"
                  src={logoutWhite}
                  alt="logout button"
                />
              </div>
            </button>
          </nav>
        ) : (
          <div className="header__options">
            <p className="header__home">Home</p>
            <button className="header__button-signin" onClick={onCreateSignIn}>
              Sign in
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
