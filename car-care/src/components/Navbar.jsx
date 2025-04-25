// File: Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './Navbar.css';
import supabaseClient from '../services/supabaseClient';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      const userId = session?.user?.id;
      if (!userId) return;

      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single();

      if (profile?.full_name) {
        setUserInitial(profile.full_name.charAt(0).toUpperCase());
      }
    };

    fetchProfile();
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/RequestService", label: "Request Service" },
    { to: "/Confirmation", label: "My Bookings" },
    { to: "/loginPage", label: "Login" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">CarCare 🛠️</Link>
        </div>

        <div className="nav-links desktop-only">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          {userInitial && (
            <div className="user-initial">
              {userInitial}
            </div>
          )}
        </div>

        <div className="mobile-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />}
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`mobile-link ${location.pathname === item.to ? 'active' : ''}`}
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
