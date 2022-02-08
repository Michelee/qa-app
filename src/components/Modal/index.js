import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-icon.svg";
import "./Modal.css";

const Modal = ({ openModal, setOpenModal, children }) => (
  <div className={`modal__background ${openModal ? 'modal__open' : 'modal__close'}`}>
    <div className="modal__content" data-testid="modal-container">
      <div
        className="modal__closeIcon"
        onClick={() => setOpenModal(!openModal)}
      >
        <CloseIcon />
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
