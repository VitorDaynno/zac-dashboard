import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

function CustomModal(props) {
  const { title, children, isVisible } = props;

  const close = () => {
    const { onClose } = props;
    onClose();
  }

  const confirm = () => {
    const { onConfirm } = props;
    onConfirm();
  }

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={close}
      className="custom-modal"
    >
      <h5 className="center">{title}</h5>
      <div className="divider" />
      <div className="modal-children">
        {children}
      </div>
      <div className="divider" />
      <div className="right modal-buttons">
        <span className="modal-button" onClick={close}>
          Sair
        </span>
        <span className="modal-button" href="#" onClick={confirm}>
          Ok
        </span>
      </div>
    </Modal>    
  );
}

export default CustomModal;

