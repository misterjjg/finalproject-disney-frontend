import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const SignInModal = ({
  onClose,
  buttonText,
  isOpen,
  onCreateSignUp,
  setModals,
  onSubmit,
  loginValidation,
  setLoginValidation,
}) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  console.log("signin", isOpen);

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const validInputEmail = emailRegex.test(e.target.value);
    if (!validInputEmail) {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address!",
      }));
    } else {
      setErrorMessage((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  const validEmail = emailRegex.test(email);

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const validPassword = password.length > 0;
  const isFormValid = validEmail && validPassword;

  useEffect(() => {
    setEmail("");
    setPassword("");
    setLoginValidation("");
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isFormValid) {
      console.log({ email, password });
      onSubmit({ email, password });
      console.log(loginValidation);
    }
  }
  return (
    <ModalWithForm
      title="Sign in"
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isFormValid}
      buttonText={buttonText}
      name="signin"
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
        {errorMessage.email}
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
      <p
        className={
          loginValidation === ""
            ? "modal__validation-none"
            : "modal__validation-signin"
        }
      >
        {loginValidation}
      </p>
      <div className="modal__bottom modal__bottom-signin">
        <p className="modal__or">or</p>
        <button
          className="modal__button-two"
          type="button"
          onClick={onCreateSignUp}
        >
          Sign up
        </button>
      </div>
    </ModalWithForm>
  );
};
export default SignInModal;
