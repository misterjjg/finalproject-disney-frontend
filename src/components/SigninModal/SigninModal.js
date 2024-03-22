import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SigninModal({ isOpen, onSignin, handleClose, onAltClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (email === "" || password === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignin({ email, password });
  };

  return (
    <ModalWithForm
      title="Sign In"
      onSubmit={handleSubmit}
      onClose={handleClose}
      handleAltClick={onAltClick}
      buttonText="Sign in"
      altButtonText="Sign up"
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
    </ModalWithForm>
  );
}

export default SigninModal;
