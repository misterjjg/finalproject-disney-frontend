import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../hooks/useForm";

function SigninModal({ isOpen, onSignin, handleClose, onAltClick }) {
  const { values, errors, handleChange, isValid, resetForm } =
    useFormWithValidation({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignin(values);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="signin"
      title="Sign In"
      onSubmit={handleSubmit}
      onClose={handleClose}
      handleAltClick={onAltClick}
      buttonText="Sign in"
      altButtonText="Sign up"
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
          type="password"
          placeholder="Enter Password"
          name="password"
          value={valuespassword}
          onChange={handleChange}
          required
        />
      </label>
      <span className="modal__error" id="password-input-error">
        {errors.password}
      </span>
    </ModalWithForm>
  );
}

export default SigninModal;
