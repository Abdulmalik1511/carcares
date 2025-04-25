// File: Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import './Navbar.css';
import supabaseClient from '../services/supabaseClient';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const [session, setSession] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      setSession(session); // save session info for login/logout checks

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

    // Listen for auth changes (login/logout live)
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    navigate('/loginPage'); // Redirect after logout
  };

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
          {navItems
            .filter(item => {
              if (item.label === "Login" && session) return false; // Hide Login if logged in
              return true;
            })
            .map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}

          {session && (
            <>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
              <div className="user-initial">
                {userInitial}
              </div>
            </>
          )}
        </div>

        <div className="mobile-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />}
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          {navItems
            .filter(item => {
              if (item.label === "Login" && session) return false;
              return true;
            })
            .map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`mobile-link ${location.pathname === item.to ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

          {session && (
            <button className="mobile-logout-btn" onClick={() => { handleLogout(); setIsOpen(false); }}>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
