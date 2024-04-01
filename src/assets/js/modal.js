import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}> Fechar </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
