import "./ModalWithForm.css";
import CloseButton from "../../images/CloseButton.svg";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  onSubmit,
  onRegisterModal,
  onLoginModal,
}) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <img
          className="modal__close-button-logo"
          onClick={onClose}
          src={CloseButton}
          alt={"Close Icon"}
        />
        <h3 className="modal__title">{title}</h3>
        <form className="modal__labels" onClick={onSubmit}>
          {children}
          {title === "Sign In" ? (
            <div className="modal__buttons">
              <button className="modal__button-submit" type="submit">
                {buttonText}
              </button>
              <div className="modal__button-other-option-content">
                <p className="modal__button-other-option-or">or</p>
                <button
                  className="modal__button-other-option"
                  onClick={onRegisterModal}
                >
                  Sign Up
                </button>
              </div>
            </div>
          ) : (
            <div className="modal__buttons">
              <button className="modal__button-submit" type="submit">
                {buttonText}
              </button>
              <div className="modal__button-other-option-content modal__button-other-option-signup">
                <p className="modal__button-other-option-or">or</p>
                <button
                  className="modal__button-other-option"
                  onClick={onLoginModal}
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
