import React, { useState } from "react";
import "../styles/RequestService.css";
import Navbar from "../components/Navbar";

const RequestService = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    plateNumber: "",
    plateLetter1: "",
    plateLetter2: "",
    serviceType: "",
    date: "",
    location: "",
    notes: "",
  });

  const plateLetters = [
    "A أ",
    "B ب",
    "D د",
    "H ح",
    "M م",
    "R ر",
    "S س",
    "W و",
    "Y ي",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request submitted successfully!");
    console.log(formData); // Later, you will send this to Firebase or Supabase
  };

  return (
    <>
      <div className="request-page">
        <div className="request-container">
          <Navbar />
          <h2>Request a Car Service</h2>
          <form onSubmit={handleSubmit} className="request-form">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Plate Number (Max 5 digits)</label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,5}$/.test(value)) {
                  setFormData((prev) => ({ ...prev, plateNumber: value }));
                }
              }}
              required
              placeholder="e.g. 12345"
            />

            <label>Plate Letters</label>
            <div className="plate-letters">
              <select
                name="plateLetter1"
                value={formData.plateLetter1}
                onChange={handleChange}
                required // ✅ this makes it required
              >
                <option value="">--</option>
                {plateLetters.map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>

              <select
                name="plateLetter2"
                value={formData.plateLetter2}
                onChange={handleChange}
              >
                <option value="">--</option>
                {plateLetters.map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>

            <label>Service Type</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Battery Replacement">Battery Replacement</option>
              <option value="Tire Service">Tire Service</option>
            </select>

            <label>Preferred Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label>Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className="submit-button">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestService;
