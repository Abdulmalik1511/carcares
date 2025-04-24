import React, { useState } from "react";
import "../styles/RequestService.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


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
    carBrand: "",
  });

  const navigate = useNavigate();

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
    console.log(formData); // You may send this to a backend later
    navigate("/confirmation"); // Redirect to confirmation page
  };
  
  return (
    <>
      <div className="request-page">
        <div className="request-container">
          <div className="form-header">
            <h2>Request a Car Service</h2>
            <p>Get your car serviced at your preferred location</p>
          </div>
          
          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <div className="input-with-icon">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number <span className="required">*</span></label>
              <div className="input-with-icon">
                <span className="input-icon">📱</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Plate Number (Max 5 digits) <span className="required">*</span></label>
              <div className="input-with-icon">
                <span className="input-icon">🔢</span>
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
              </div>
            </div>

            <div className="form-group">
              <label>Plate Letters</label>
              <div className="plate-letters">
                <div className="input-with-icon">
                  <span className="input-icon">🔤</span>
                  <select
                    name="plateLetter1"
                    value={formData.plateLetter1}
                    onChange={handleChange}
                    required
                  >
                    <option value="">--</option>
                    {plateLetters.map((letter) => (
                      <option key={letter} value={letter}>
                        {letter}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-with-icon">
                  <span className="input-icon">🔤</span>
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
              </div>
            </div>
            
            <div className="form-group">
              <label>Select Car Brand <span className="required">*</span></label>
              <div className="car-brand-grid">
                {[
                  { name: "Toyota", icon: "/images/icons8-toyota-480.png" },
                  { name: "Bmw", icon: "/images/icons8-bmw-480.png" },
                  { name: "Audi", icon: "/images/icons8-mercedes-480.png" },
                  { name: "Ford", icon: "/images/icons8-ford-480.png" },
                  { name: "Chevrolet", icon: "/images/icons8-chevrolet-480.png" },
                  { name: "Honda", icon: "/images/icons8-honda-500.png" },
                  { name: "Kia", icon: "/images/icons8-kia-480.png" },
                  { name: "Nissan", icon: "/images/icons8-nissan-480.png" },
                  { name: "Hyundai", icon: "/images/icons8-hyundai-480.png" },
                ].map((brand) => (
                  <div
                    key={brand.name}
                    className={`brand-box ${
                      formData.carBrand === brand.name ? "selected" : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, carBrand: brand.name }))
                    }
                  >
                    <img src={brand.icon} alt={brand.name} />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Service Type <span className="required">*</span></label>
              <div className="input-with-icon">
                <span className="input-icon">🔧</span>
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
              </div>
            </div>

            <div className="form-group">
              <label>Preferred Date <span className="required">*</span></label>
              <div className="input-with-icon">
                <span className="input-icon">📅</span>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Location <span className="required">*</span></label>
              <div className="input-with-icon">
                <span className="input-icon">📍</span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <div className="input-with-icon">
                <span className="input-icon">📝</span>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestService;