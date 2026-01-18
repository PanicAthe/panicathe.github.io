import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__content">
          <p>&copy; {new Date().getFullYear()} panicathe. All rights reserved.</p>
          <p>Built with React and Vite.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
