import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import supabaseClient from "../services/supabaseClient";
import "../styles/Confirmation.css";

const Confirmation = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
      const user = session?.user;

      if (sessionError || !user) {
        setErrorMsg("You must be logged in to view your request status.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabaseClient
        .from("service_requests")
        .select("status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single(); // Get latest request

      if (error) {
        setErrorMsg(error.message);
      } else {
        setStatus(data?.status);
      }

      setLoading(false);
    };

    fetchStatus();
  }, []);

  return (
    <>
      <Navbar />
      <div className="confirmation-container">
        <div className="confirmation-box">
          {loading ? (
            <p>Loading...</p>
          ) : errorMsg ? (
            <p className="error-message">{errorMsg}</p>
          ) : status ? (
            <>
              <h2>✅ Request Status</h2>
              <p>Your car service request status:</p>
              <p><strong>Status:</strong> {status}</p>
              <p>Our team will contact you based on your request's progress.</p>
            </>
          ) : (
            <>
              <h2>ℹ️ No Request Found</h2>
              <p>You haven't submitted any service request yet.</p>
            </>
          )}

          <Link to="/">
            <button className="back-home-btn">Back to Home</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
