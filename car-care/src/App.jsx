// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import RequestService from './pages/RequestService';
import Confirmation from './pages/Confirmation';
import LoginPage from './pages/LoginPage';    // ← import your LoginPage
import SignUpPage from './pages/SignUpPage';    // ← import your LoginPage


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/RequestService" element={<RequestService />} />
        <Route path="/Confirmation"   element={<Confirmation />} />
        <Route path="/loginPage"      element={<LoginPage />} />    {/* ← add this */}
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="*"               element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
