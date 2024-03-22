function SuccessModal({ name, onClose, handleClick }) {
  return (
    <div className={`modal modal__type_${name}`}>
      <div className="modal__container">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="modal__title">Registration Successfully Completed!</h2>
        <button className="modal__signin-btn" onClick={handleClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
