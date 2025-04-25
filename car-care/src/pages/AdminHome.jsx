import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import supabaseClient from '../services/supabaseClient';
import '../styles/AdminHome.css';

const AdminHome = () => {
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestCount = async () => {
      const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
      const user = session?.user;

      if (sessionError || !user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabaseClient
        .from('service_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending')
        .eq('user_id', user.id);

      if (!error) {
        setRequestCount(data?.count || 0);
      }
      setLoading(false);
    };

    fetchRequestCount();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="admin-home">
        <div className="admin-dashboard">
          <h2>Welcome, <span className="highlight">Admin</span></h2>
          <p className="subtitle">Manage your own service requests and offerings.</p>

          <div className="admin-cards">
            <div className="admin-card">
              <h3>📬 My Pending Requests</h3>
              <p>View and handle your own pending service submissions.</p>
              {loading ? (
                <p>Loading count...</p>
              ) : (
                <p><strong>{requestCount}</strong> pending request(s)</p>
              )}
              {/* Updated Link to /admin/requests */}
              <Link to="/admin/requests" className="admin-button">
                View My Requests
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminHome;
