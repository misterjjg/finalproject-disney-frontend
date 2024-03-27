import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignupModal({ isOpen, onSignup, handleClose, onAltClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    onSignup({ email, password, name });
  }

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (email === "" || password === "" || name === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password, name]);

  return (
    <ModalWithForm
      name="signup"
      title="Sign Up"
      onSubmit={handleSubmit}
      handleAltClick={onAltClick}
      onClose={handleClose}
      buttonText="Sign up"
      altButtonText="Sign in"
      isDisabled={isDisabled}
    >
      <label>
        <h3 className="modal__label">Email:</h3>
        <input
          className="modal__input"
          id="email-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <span className="modal__error" id="email-input-error"></span>
      <label>
        <h3 className="modal__label">Password:</h3>
        <input
          className="modal__input"
          id="password-input"
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <span className="modal__error" id="password-input-error"></span>
      <label>
        <h3 className="modal__label">Username:</h3>
        <input
          className="modal__input"
          id="username-input"
          type="text"
          placeholder="Enter your Username"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <span className="modal__error" id="username-input-error"></span>
      <span className="modal__error" id="email-unavailable-error"></span>
    </ModalWithForm>
  );
}

export default SignupModal;
