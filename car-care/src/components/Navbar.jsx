import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './Navbar.css'; // Import the CSS

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/RequestService", label: "Request Service" },
    { to: "/Confirmation", label: "My Bookings" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">CarCare 🛠️</Link>
        </div>

        <div className="nav-links desktop-only">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${
                location.pathname === item.to ? 'active' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mobile-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />}
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`mobile-link ${
                location.pathname === item.to ? 'active' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
