import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__divider"></div>
        <div className="footer__content">
          <div className="footer__brand">
            <h3 className="footer__logo">Eunjin Choi</h3>
            <p className="footer__tagline">Backend Developer · Problem Solver</p>
          </div>
          <div className="footer__meta">
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} Eunjin Choi. All rights reserved.
            </p>
            <p className="footer__tech">Built with React, Vite</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
