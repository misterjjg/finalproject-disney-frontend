import "./SavedNewsHeader.css";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import logoutBlack from "../../images/Logout-black.svg";
import menuBlack from "../../images/Menu-black.svg";

const SavedNewsHeader = ({ windowWidth, onCreateMenu, logout }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return windowWidth < 550 ? (
    <div className="header">
      <header className="header__section-saved">
        <Link to="/" className="header__links">
          <p className="header__title-saved">NewsExplorer</p>
        </Link>
        <button
          className="header__menu-saved"
          type="button"
          onClick={onCreateMenu}
        >
          <img src={menuBlack} alt="menu" className="header__menu-pic" />
        </button>
      </header>
    </div>
  ) : (
    <div className="header">
      <header className="header__section-saved">
        <Link to="/" className="header__links-saved">
          <p className="header__title-saved">NewsExplorer</p>
        </Link>
        <div className="header__options-saved">
          <Link to="/" className="header__links-saved">
            <p className="header__home-saved">Home</p>
          </Link>
          <p className="header__articles-saved">Saved articles</p>
          <div className="header__profile-saved">
            <p className="header__name-saved">{currentUser.name}</p>
            <button className="header__pic-saved" onClick={logout}>
              <img
                className="header__img-saved"
                src={logoutBlack}
                alt="logout button"
              />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default SavedNewsHeader;
