import React from 'react';

const Popup = ({ children, onClose }) => {
  return (
    <div className="popup__overlay" onClick={onClose}>
      <div
        className="popup__content"
        onClick={(e) => e.stopPropagation()} // evita que el click interno cierre el popup
      >
        <button className="popup__close" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
