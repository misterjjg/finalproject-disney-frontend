import "./Navigation.css";
import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import CurrentPageContext from "../../contexts/CurrentPageContext.js";
import MobileContext from "../../contexts/MobileContext.js";
import logoutDark from "../../images/Logout-black.svg";
import logout from "../../images/Logout-white.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Navigation({ onSigninClick, onSignoutClick }) {
  const { currentPage, activeModal } = useContext(CurrentPageContext);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const { openMobileMenu } = useContext(MobileContext);

  return (
    <>
      {isLoggedIn && currentPage === "/" ? (
        <nav className="nav">
          <NavLink to="/" className="nav__link">
            <h1 className="nav__title">NewsExplorer</h1>
          </NavLink>
          <button
            className={"nav__mobile"}
            type="button"
            onClick={openMobileMenu}
          />
          <div className="nav__button-container nav__button-container_hidden">
            <div className="nav__home-container">
              <NavLink to="/" className="nav__link">
                <button className="nav__home" type="button">
                  Home
                </button>
              </NavLink>
              <span className="nav__underline"></span>
            </div>
            <div className="nav__saved-container">
              <NavLink to="/saved-news" className="nav__link">
                <button className="nav__saved" type="button">
                  Saved articles
                </button>
              </NavLink>
            </div>
            <button
              className="nav__profile-signed-in"
              type="button"
              onClick={onSignoutClick}
            >
              <h2 className="nav__username">{currentUser.name}</h2>
              <img src={logout} className="nav__logout" alt="logout" />
            </button>
          </div>
        </nav>
      ) : isLoggedIn && currentPage === "/saved-news" ? (
        <nav className="saved-news__nav">
          <NavLink to="/" className="saved-news__nav-link">
            <h1 className="saved-news__nav-title">NewsExplorer</h1>
          </NavLink>
          <button
            className={"saved-news__nav-mobile"}
            type="button"
            onClick={openMobileMenu}
          />
          <div className="saved-news__nav-button-container saved-news__nav-button-container_hidden">
            <div className="saved-news__nav-home-container">
              <NavLink to="/" className="saved-news__nav-link">
                <button className="saved-news__nav-home" type="button">
                  Home
                </button>
              </NavLink>
            </div>
            <div className="saved-news__nav-saved-container">
              <NavLink to="/saved-news" className="saved-news__nav-link">
                <button className="saved-news__nav-saved" type="button">
                  Saved Articles
                </button>
              </NavLink>
              <span className="saved-news__nav-underline"></span>
            </div>
            <button
              className="saved-news__nav-profile"
              type="button"
              onClick={onSignoutClick}
            >
              <h2 className="saved-news__nav-username">{currentUser.name}</h2>
              <img
                src={logoutDark}
                className="saved-news__nav-logout"
                alt="logout"
              />
            </button>
          </div>
        </nav>
      ) : (
        <nav className="nav">
          <NavLink to="/" className="nav__link">
            <h1 className="nav__title">NewsExplorer</h1>
          </NavLink>
          <button
            className={`nav__mobile ${
              activeModal === "signin" || activeModal === "signup"
                ? "nav__mobile_hidden"
                : ""
            }`}
            type="button"
            onClick={openMobileMenu}
          />
          <div className="nav__button-container nav__button-container_hidden">
            <div className="nav__home-container">
              <NavLink to="/" className="nav__link">
                <button className="nav__home" type="button">
                  Home
                </button>
              </NavLink>
              <span className="nav__underline"></span>
            </div>
            <button
              className="nav__profile"
              type="button"
              onClick={onSigninClick}
            >
              Sign In
            </button>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navigation;
