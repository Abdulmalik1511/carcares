import React from "react";
import { Link } from "react-router-dom";
import "../styles/Confirmation.css";

const Confirmation = () => {
  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <h2>✅ Request Submitted!</h2>
        <p>Your car service request has been received successfully.</p>
        <p>Our team will contact you shortly to confirm the details.</p>
        <Link to="/">
          <button className="back-home-btn">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
