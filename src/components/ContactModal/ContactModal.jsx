import React, { useState } from 'react';
import './ContactModal.css';

function ContactModal({ isOpen, onClose }) {
  const [isCopied, setIsCopied] = useState(false);
  const email = 'panicathe@naver.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="contact-modal-close" onClick={onClose}>&times;</button>
        <h3>연락하기</h3>
        <div className="contact-info">
          <p>{email}</p>
          <button onClick={handleCopy} className="copy-button">
            {isCopied ? '복사 되었습니다!' : '복사'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
