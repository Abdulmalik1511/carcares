import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AdminHome.css';

const AdminHome = () => {
  return (
    <div>
      <Navbar />
      <main className="admin-home">
        <div className="admin-dashboard">
          <h2>Welcome, <span className="highlight">Admin</span></h2>
          <p className="subtitle">Easily manage incoming service requests and your offerings.</p>

          <div className="admin-cards">
            <div className="admin-card">
              <h3>📬 Pending Requests</h3>
              <p>View and handle all new service submissions from users.</p>
              <Link to="/admin/requests" className="admin-button">View Requests</Link>
            </div>

            <div className="admin-card">
              <h3>🔄 Service Status</h3>
              <p>Update and manage the progress of user service bookings.</p>
              <Link to="/admin/status" className="admin-button">Manage Status</Link>
            </div>

            <div className="admin-card">
              <h3>🛠️ Service Management</h3>
              <p>Edit available service types, prices, and descriptions.</p>
              <Link to="/admin/services" className="admin-button">Edit Services</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminHome;
