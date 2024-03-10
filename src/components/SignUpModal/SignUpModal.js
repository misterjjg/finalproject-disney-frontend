import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const SignUpModal = ({
  onClose,
  buttonText,
  isOpen,
  onCreateSignIn,
  onCreateSuccess,
  setModals,
  onSubmit,
  signupValidation,
  setSignupValidation,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const validInputEmail = emailRegex.test(e.target.value);
    if (!validInputEmail) {
      setErrorMessage("Invalid email address!");
    } else {
      setErrorMessage("");
    }
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [name, setName] = useState("");
  const handleUsernameChange = (e) => {
    setName(e.target.value);
  };

  const validEmail = emailRegex.test(email);
  const validPassword = password.length > 0;
  const validUserName = name.length > 0;
  const isFormValid = validEmail && validPassword && validUserName;

  useEffect(() => {
    setEmail("");
    setPassword("");
    setSignupValidation("");
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isFormValid) {
      onSubmit({ email, password, name });
      if (signupValidation === "") {
        console.log("sign up successful");
        onCreateSuccess();
      }
    }
  }
  return (
    <ModalWithForm
      title="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isFormValid}
      buttonText={buttonText}
      name="signup"
      setModals={setModals}
    >
      <label className="modal__info">
        Email
        <input
          value={email}
          className="modal__input"
          type="email"
          name="email"
          minLength="1"
          maxLength="30"
          placeholder="Enter email"
          onChange={handleEmailChange}
          required
        />
      </label>
      <p className={errorMessage === "" ? "modal__error-none" : "modal__error"}>
        {errorMessage}
      </p>
      <label className="modal__info">
        Password
        <input
          value={password}
          className="modal__input"
          type="password"
          name="password"
          minLength="1"
          maxLength="30"
          placeholder="Enter password"
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label className="modal__info">
        Username
        <input
          value={name}
          className="modal__input"
          type="text"
          name="username"
          minLength="1"
          maxLength="30"
          placeholder="Enter your username"
          onChange={handleUsernameChange}
          required
        />
      </label>
      <p
        className={
          signupValidation === ""
            ? "modal__validation-none"
            : "modal__validation-signup"
        }
      >
        {signupValidation}
      </p>
      <div className="modal__bottom modal__bottom-signup">
        <p className="modal__or">or</p>
        <button
          className="modal__button-two"
          type="button"
          onClick={onCreateSignIn}
        >
          Sign in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default SignUpModal;
