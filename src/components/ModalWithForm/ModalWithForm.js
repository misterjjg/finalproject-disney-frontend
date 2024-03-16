function ModalWithForm({
  name,
  children,
  title,
  onSubmit,
  onClose,
  buttonText,
  handleAltClick,
  altButtonText,
  isDisabled,
}) {
  return (
    <div className="modal">
      <div className={`modal__container modal__container-${name}`}>
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close" type="button" onClick={onClose} />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__btn-container">
            <button
              className={`modal__submit-btn ${
                isDisabled === true ? "modal__submit-btn_disabled" : ""
              }`}
              id="submit"
              type="submit"
              disabled={isDisabled}
            >
              {buttonText}
            </button>
            <button
              className="modal__alt-btn"
              type="button"
              onClick={handleAltClick}
            >
              or <span className="modal__alt-text">{altButtonText}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
