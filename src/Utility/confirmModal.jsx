import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen && (
      <div className="confirm-modal">
        <div className="confirm-modal-content">
          <h2>Confirm Operation</h2>
          <p>Are you sure to perform this operation?</p>
          <div className="confirm-modal-buttons">
            <button onClick={(e) => onConfirm(e)}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
