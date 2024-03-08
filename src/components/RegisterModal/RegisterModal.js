import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onClose, onRegisterModal, isOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassWord(e.target.value);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Next"
      className="modal__title"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleRegisterSubmit}
      onRegisterModal={onRegisterModal}
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
            type="text"
            name="password"
            minLength="1"
            maxLength="30"
            placeholder="Enter password"
            value={password}
            required={true}
            onChange={handlePasswordChange}
          ></input>
        </label>
        <label className="modal__label">
          Username
          <input
            className="modal__input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Enter username"
            value={name}
            required={true}
            onChange={handleNameChange}
          ></input>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default RegisterModal;
