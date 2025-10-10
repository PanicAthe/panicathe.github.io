import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__socials">
        <a href="mailto:ekdekdgkrp20@gmail.com" target="_blank" rel="noopener noreferrer">Gmail</a>

      </div>
      <div className="footer__content">
        <p>&copy; {new Date().getFullYear()} panicathe. All Rights Reserved.</p>
        <p>Built with React, inspired by Netflix.</p>
      </div>
    </footer>
  );
}

export default Footer;
