import "./MenuModal.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const MenuModal = ({
  onCreateSignIn,
  isOpen,
  onClose,
  setModals,
  loggedIn,
  logout,
}) => {
  const location = useLocation();
  console.log(loggedIn);

  const onLogout = () => {
    onClose();
    logout();
  };

  return (
    <ModalWithForm name="menu" onSubmit={onCreateSignIn} setModals={setModals}>
      <Header windowWidth={320} name="menu" isOpen={isOpen} onClose={onClose} />
      <div className="menu">
        {loggedIn && location.pathname === "/" ? (
          <Link to="/saved-articles" className="menu__links">
            <p className="menu__home" onClick={onClose}>
              Saved Articles
            </p>
          </Link>
        ) : (
          <Link to="/" className="menu__links">
            <p className="menu__home" onClick={onClose}>
              Home
            </p>
          </Link>
        )}
        <button
          type="button"
          className="menu__button"
          onClick={loggedIn ? onLogout : onCreateSignIn}
        >
          {loggedIn ? "Sign out" : "Sign in"}
        </button>
      </div>
    </ModalWithForm>
  );
};

export default MenuModal;
