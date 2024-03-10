import "./ModalWithForm.css";
import React from "react";

const ModalWithForm = ({
  title,
  onClose,
  onSubmit,
  name,
  children,
  isSubmitDisabled,
  buttonText,
  setModals,
}) => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal__section")) {
      setModals({ signin: false, signup: false, success: false, menu: false });
    }
  };

  return (
    <div className="modal">
      <div
        className={`modal__section modal__section_${name}`}
        onClick={handleOutsideClick}
      >
        <div className={`modal__content modal__content_${name}`}>
          <button
            className={`modal__button-reset modal__button-reset_${name}`}
            type="button"
            onClick={onClose}
          ></button>
          <h3 className={`modal__title modal__title_${name}`}>{title}</h3>
          <form
            className={`modal__form modal__form_${name}`}
            onSubmit={onSubmit}
          >
            {children}
            <button
              className={`modal__button-submit modal__button-submit_${name}`}
              type="submit"
              disabled={!isSubmitDisabled}
              tabIndex="0"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalWithForm;
