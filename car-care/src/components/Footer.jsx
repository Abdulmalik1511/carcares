import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="brand">CarCare</span>. All rights reserved.
        </p>
        <p className="tagline">Bringing car maintenance to your doorstep 🚗🛠️</p>
      </div>
    </footer>
  );
};

export default Footer;
