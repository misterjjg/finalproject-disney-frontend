import "./ModalWithMenu";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import closeButton from "../../images/CloseButton.svg";
import logout from "../../images/Logout.svg";

const ModalWithMenu = ({ onClose, onLoginModal, onSignOut }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className={`menu`}>
      <div className="menu__header-content">
        <div className="menu__header">
          <h1 className="menu__header-title">
            <Link className="menu__home-link" to="/">
              News Explorer
            </Link>
          </h1>
          <img
            className="menu__close-button"
            src={closeButton}
            alt={"Close Icon"}
            onClick={onClose}
          />
        </div>
        <div className="menu__content">
          <button className="menu__button menu__button-home">
            <Link className="menu__home-link">Home</Link>
          </button>

          {!currentUser?.email && (
            <button
              className="menu__button menu__button-signin"
              onClick={onLoginModal}
            >
              Sign In
            </button>
          )}

          {currentUser?.email && (
            <div className="menu__saved-news">
              <Link className="menu__saved-news-link" to="/savednews">
                Saved Articles
              </Link>
            </div>
          )}

          {currentUser?.email && (
            <button
              onClick={onSignOut}
              className="menu__button menu__button-signin"
            >
              <div className="header__button-logout">
                {currentUser.name}
                <img src={logout} alt="logout" />
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="menu__remaining"></div>
    </div>
  );
};

export default ModalWithMenu;
