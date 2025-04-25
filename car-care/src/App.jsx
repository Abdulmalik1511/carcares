// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from './pages/AdminHome';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import RequestService from './pages/RequestService';
import Confirmation from './pages/Confirmation';
import LoginPage from './pages/LoginPage';    // ← import your LoginPage
import SignUpPage from './pages/SignUpPage';    // Home← import your LoginPage
import AdminRequests from './pages/AdminRequests';

// inside your <Routes>



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/loginPage"               element={<LoginPage />} />
        <Route path="/RequestService" element={<RequestService />} />
        <Route path="/Confirmation"   element={<Confirmation />} />
        <Route path="/"      element={<Home />} />    {/* ← add this */}
        <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/requests" element={<AdminRequests />} />

        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
