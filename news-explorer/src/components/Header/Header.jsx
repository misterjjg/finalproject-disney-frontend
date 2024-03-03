import "./Header.css";
import logout from "../../images/Logout-dark.svg";
import logoutDark from "../../images/Logout-dark.svg";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ onSignIn, onSignOut, onMenuModal, currentPage }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header
      className={"header"}
      style={{ backgroundImage: "../../TopBackground.svg" }}
    >
      {currentPage !== "Home" ? (
        <div className="header__save-news-border"></div>
      ) : (
        <></>
      )}
      {currentPage === "Home" ? (
        <div>
          <Link className={`header__logo header__home`} to="/">
            <p className="header__logo-paragraph">NewsExplorer</p>
          </Link>
        </div>
      ) : (
        <div>
          <Link className={`header__logo`} to="/">
            <p className="header__logo-paragraph">NewsExplorer</p>
          </Link>
        </div>
      )}
      {currentPage === "Home" ? (
        <button className="header__menu-mobile-button" onClick={onMenuModal}>
          <div className="header__menu-mobile-button-design"></div>
          <div className="header__menu-mobile-button-design"></div>
        </button>
      ) : (
        <button className="header__menu-mobile-button" onClick={onMenuModal}>
          <div className="header__menu-mobile-button-saved-news"></div>
          <div className="header__menu-mobile-button-saved-news"></div>
        </button>
      )}
      <div className="header__buttons">
        {currentPage === "Home" ? (
          <div className="header__button-container">
            <button
              className={`header__button header__button-home header__home`}
            >
              <Link className="header__home-link" to="/">
                <p className="header__button-title">Home</p>
              </Link>
            </button>
            <div className="header__button-home-highlighter"></div>
          </div>
        ) : (
          <div className="header__button-container">
            <button className={`header__button header__button-home`}>
              <Link className="header__link-saved-news" to="/">
                <p className="header__button-title">Home</p>
              </Link>
            </button>
          </div>
        )}
        {currentUser?.name && currentPage === "Home" ? (
          <div className="header__button-container">
            <button
              className={`header__button header__button-home header__home-saved-news`}
            >
              <Link className="header__link" to="/savednews">
                <p className="header__button-title">Saved articles</p>
              </Link>
            </button>
          </div>
        ) : (
          currentUser?.name && (
            <div className="header__button-container">
              <button className={`header__button header__button-home`}>
                <Link
                  className="header__link header__link-saved-news"
                  to="/savednews"
                >
                  <p className="header__button-title">Saved articles</p>
                </Link>
              </button>
              <div className="header__button-home-highlighter header__button-saved-news-highlighter"></div>
            </div>
          )
        )}
        {!currentUser?.name && currentPage === "Home" ? (
          <button
            className="header__button header__signin header__home"
            onClick={onSignIn}
          >
            <p className="header__button-title">Sign-In</p>
          </button>
        ) : (
          !currentUser?.name && (
            <button
              className="header__button header__signin"
              onClick={onSignIn}
            >
              <p className="header__button-title">Sign-In</p>
            </button>
          )
        )}
        {currentUser?.name && currentPage === "Home" ? (
          <button
            className="header__button header__signin header__home"
            onClick={onSignOut}
          >
            <div className="header__button-logout">
              <p className="header__button-title">{currentUser.name}</p>
              <img src={logout} alt="logout" />
            </div>
          </button>
        ) : (
          currentUser?.name && (
            <button
              className="header__button header__signin"
              onClick={onSignOut}
            >
              <div className="header__button-logout">
                <p className="header__button-title">{currentUser.name}</p>
                <img src={logoutDark} alt="logout" />
              </div>
            </button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
