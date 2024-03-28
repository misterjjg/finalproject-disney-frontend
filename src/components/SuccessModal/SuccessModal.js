function SuccessModal({ name, onClose, onClick }) {
  return (
    <div className={"modal"}>
      <div className={`modal__container modal__container-${name}`}>
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="modal__title">Registration Successfully Completed!</h2>
        <button className="modal__signin-btn" onClick={onClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
