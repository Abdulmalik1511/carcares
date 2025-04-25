import React, { useState } from "react";
import "../styles/RequestService.css";
import Navbar from "../components/Navbar";
import supabaseClient from "../services/supabaseClient";

const RequestService = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    plate_letters: "",
    car_brand: "",
    service_type: "",
    preferred_date: "",
    location: "",
    notes: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
    const user = session?.user;

    if (sessionError || !user) {
      setErrorMsg("You must be logged in to submit a request.");
      setLoading(false);
      return;
    }

    const payload = {
      user_id: user.id,
      ...formData
    };

    const { error } = await supabaseClient
      .from("service_requests")
      .insert(payload);

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSubmitted(true);
    }
  };

  const carBrands = [
    { name: "Toyota", icon: "public/images/icons8-toyota-480.png" },
    { name: "Bmw", icon: "public/images/icons8-bmw-480.png" },
    { name: "Audi", icon: "public/images/icons8-mercedes-480.png" },
    { name: "Ford", icon: "public/images/icons8-ford-480.png" },
    { name: "Chevrolet", icon: "public/images/icons8-chevrolet-480.png" },
    { name: "Honda", icon: "public/images/icons8-honda-500.png" },
    { name: "Kia", icon: "public/images/icons8-kia-480.png" },
    { name: "Nissan", icon: "public/images/icons8-nissan-480.png" },
    { name: "Hyundai", icon: "public/images/icons8-hyundai-480.png" },
  ];

  return (
    <>
      <Navbar />
      <div className="request-page">
        <div className="request-container">
          {submitted ? (
            <div className="confirmation">
              <h2>Thank You!</h2>
              <p>Your service request has been submitted successfully.</p>
            </div>
          ) : (
            <>
              <div className="form-header">
                <h2>Request a Car Service</h2>
                <p>Get your car serviced at your preferred location</p>
              </div>

              {errorMsg && <p className="error-message">{errorMsg}</p>}

              <form onSubmit={handleSubmit} className="request-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Plate Letters *</label>
                  <input
                    type="text"
                    name="plate_letters"
                    value={formData.plate_letters}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Select Car Brand *</label>
                  <div className="car-brand-grid">
                    {carBrands.map((brand) => (
                      <div
                        key={brand.name}
                        className={`brand-box ${formData.car_brand === brand.name ? "selected" : ""}`}
                        onClick={() => setFormData((prev) => ({ ...prev, car_brand: brand.name }))}
                      >
                        <img src={brand.icon} alt={brand.name} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Type *</label>
                  <select
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="Battery Replacement">Battery Replacement</option>
                    <option value="Tire Service">Tire Service</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Date *</label>
                  <input
                    type="date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestService;
