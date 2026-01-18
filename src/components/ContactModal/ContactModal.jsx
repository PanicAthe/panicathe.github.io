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
        <button className="contact-modal-close" onClick={onClose}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        
        <div className="contact-modal-header">
          <h3 className="contact-modal-title">Let's Connect</h3>
        </div>

        <div className="contact-info">
          <div className="contact-info-label">이메일 주소</div>
          <div className="contact-info-content">
            <svg className="icon icon-email" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.511l7.443 4.652a1 1 0 001.114 0L20 6.511V6H4zm16 12V8.388l-8 5-8-5V18h16z" />
            </svg>
            <p className="email-text">{email}</p>
          </div>
          <button onClick={handleCopy} className="copy-button">
            {isCopied ? (
              <>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                복사 완료!
              </>
            ) : (
              <>
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                이메일 복사
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
