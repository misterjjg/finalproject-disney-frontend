import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormWithValidation from "../../utils/useForm";

function SignupModal({
  isOpen,
  onSignup,
  handleClose,
  onAltClick,
  serverErrors,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation({ email: "", password: "", name: "" });

  function handleSubmit(e) {
    e.preventDefault();
    onSignup(values);
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="signup"
      title="Sign Up"
      onSubmit={handleSubmit}
      handleAltClick={onAltClick}
      onClose={handleClose}
      buttonText="Sign up"
      altButtonText="Sign in"
      isDisabled={!isValid}
    >
      <label>
        <h3 className="modal__label">Email:</h3>
        <input
          className="modal__input"
          id="email-input"
          type="email"
          placeholder="Enter Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <span className="modal__error" id="email-input-error">
        {errors.email}
      </span>
      <label>
        <h3 className="modal__label">Password:</h3>
        <input
          className="modal__input"
          id="password-input"
          type="text"
          placeholder="Enter Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <span className="modal__error" id="password-input-error">
        {errors.password}
      </span>
      <label>
        <h3 className="modal__label">Username:</h3>
        <input
          className="modal__input"
          id="username-input"
          type="text"
          placeholder="Enter your Username"
          name="name"
          min={2}
          max={10}
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <span className="modal__error" id="username-input-error">
        {errors.name}
      </span>
      <span className="modal__error" id="email-unavailable-error">
        {serverErrors.conflictError}
      </span>
    </ModalWithForm>
  );
}

export default SignupModal;
