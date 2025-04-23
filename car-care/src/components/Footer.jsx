import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A2E] text-white py-6 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="text-[#2385C4] font-semibold">CarCare</span>. All rights reserved.
        </p>
        <p className="text-xs mt-1 text-[#F1F5F9]">Bringing car maintenance to your doorstep 🚗🛠️</p>
      </div>
    </footer>
  );
};

export default Footer;
