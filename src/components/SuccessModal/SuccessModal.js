import "./SuccessModal.css";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const SuccessModal = ({
  onCreateSuccess,
  buttonText,
  onClose,
  setModals,
  onCreateSignIn,
}) => {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      onCreateSuccess={onCreateSuccess}
      buttonText={buttonText}
      onClose={onClose}
      name="success"
      setModals={setModals}
    >
      <button
        type="button"
        onClick={onCreateSignIn}
        className="success__button"
      >
        Sign in
      </button>
    </ModalWithForm>
  );
};

export default SuccessModal;
