import React from 'react';
import { Button } from 'react-bootstrap';
import './Modal.css';

const ConfirmationModal = ({ show, onHide, onConfirm, actionType }) => {
  return (
    show && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onHide}>×</button>
          <div className="modal-icon">⚠️</div>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to {actionType} this appointment? This action cannot be undone.
          </p>
          <div className="modal-buttons">
            <Button className="cancel-button" onClick={onHide}>
              Back
            </Button>
            <Button className="delete-button" onClick={onConfirm}>
              {actionType}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
