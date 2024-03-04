import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onClose, onLogin, isOpen, onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onSignIn({ email, password });
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign In"
      className="modal__title"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleLoginSubmit}
      onLogin={onLogin}
    >
      <fieldset className="modal__form-field">
        <label className="modal__label">
          Email
          <input
            className="modal__input"
            type="email"
            name="email"
            minLength="1"
            maxLength="60"
            placeholder="Enter email"
            value={email}
            required={true}
            onChange={handleEmailChange}
          ></input>
        </label>
        <label className="modal__label">
          Password
          <input
            className="modal__input"
            type="password"
            name="password"
            minLength="1"
            maxLength="30"
            placeholder="Enter password"
            value={password}
            required={true}
            onChange={handlePasswordChange}
          ></input>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default LoginModal;
