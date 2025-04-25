import React, { useState } from "react";
import "../styles/RequestService.css";
import Navbar from "../components/Navbar";
import supabaseClient from "../services/supabaseClient";

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
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const plateLetters = [
    "A أ", "B ب", "D د", "H ح", "M م", "R ر", "S س", "W و", "Y ي",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit plate number length
    if (name === "plateNumber" && !/^\d{0,5}$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    // Get session & user
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
    const user = sessionData?.session?.user;
    if (sessionError || !user) {
      setErrorMsg("You must be logged in to submit a request.");
      setLoading(false);
      return;
    }

    // Prepare payload
    // Fetch profile id from profiles table
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('id')
      .eq('id', user.id) // or .eq('user_id', user.id) if using separate user_id column
      .single();

    if (profileError) {
      setErrorMsg(profileError.message);
      setLoading(false);
      return;
    }

    const payload = {
      user_id: profile.id,
      full_name: formData.name,
      phone: formData.phone,
      plate_number: formData.plateNumber,
      plate_letter1: formData.plateLetter1,
      plate_letter2: formData.plateLetter2,
      car_brand: formData.carBrand,
      service_type: formData.serviceType,
      preferred_date: formData.date,
      location: formData.location,
      notes: formData.notes,
    };

    // Insert into service_requests
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
                {/* Full Name */}
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

                {/* Phone Number */}
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

                {/* Plate Number */}
                <div className="form-group">
                  <label>Plate Number (Max 5 digits) <span className="required">*</span></label>
                  <div className="input-with-icon">
                    <span className="input-icon">🔢</span>
                    <input
                      type="text"
                      name="plateNumber"
                      value={formData.plateNumber}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 12345"
                    />
                  </div>
                </div>

                {/* Plate Letters */}
                <div className="form-group">
                  <label>Plate Letters</label>
                  <div className="plate-letters">
                    {[1, 2].map((_, idx) => (
                      <div className="input-with-icon" key={idx}>
                        <span className="input-icon">🔤</span>
                        <select
                          name={`plateLetter${idx + 1}`}
                          value={formData[`plateLetter${idx + 1}`]}
                          onChange={handleChange}
                        >
                          <option value="">--</option>
                          {plateLetters.map((letter) => (
                            <option key={letter} value={letter}>{letter}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Car Brand */}
                <div className="form-group">
                  <label>Select Car Brand <span className="required">*</span></label>
                  <div className="car-brand-grid">
                    {[
                      { name: "Toyota", icon: "public/images/icons8-toyota-480.png" },
                      { name: "Bmw", icon: "public/images/icons8-bmw-480.png" },
                      { name: "Audi", icon: "public/images/icons8-mercedes-480.png" },
                      { name: "Ford", icon: "public/images/icons8-ford-480.png" },
                      { name: "Chevrolet", icon: "public/images/icons8-chevrolet-480.png" },
                      { name: "Honda", icon: "public/images/icons8-honda-500.png" },
                      { name: "Kia", icon: "public/images/icons8-kia-480.png" },
                      { name: "Nissan", icon: "public/images/icons8-nissan-480.png" },
                      { name: "Hyundai", icon: "public/images/icons8-hyundai-480.png" },
                    ].map((brand) => (
                      <div
                        key={brand.name}
                        className={`brand-box ${formData.carBrand === brand.name ? "selected" : ""}`}
                        onClick={() => setFormData((prev) => ({ ...prev, carBrand: brand.name }))}
                      >
                        <img src={brand.icon} alt={brand.name} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Type */}
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

                {/* Preferred Date */}
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

                {/* Location */}
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

                {/* Notes */}
                <div className="form-group">
                  <label>Notes (Optional)</label>
                  <div className="input-with-icon">
                    <span className="input-icon">📝</span>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
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
