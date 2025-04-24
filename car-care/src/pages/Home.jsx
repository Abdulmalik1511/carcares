import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css"; // Custom CSS styling

const Home = () => {
  return (
    <div>
      <Navbar />
      <main className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div><Link to="/admin">
  <button className="admin-button">Go to Admin Page</button>
</Link></div>
            <h1>We Bring Car Care to You 🚗🛠️</h1>
            <p>Book professional car services from the comfort of your home.</p>
            <Link to="/RequestService">
              <button className="primary-button">Request a Service</button>
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="section-header">
            <h2>Our Services</h2>
          </div>
          <div className="services-grid">
            {[
              {
                title: "Oil Change",
                desc: "Fast and affordable oil changes at your home.",
                image: "public/images/icons8-oil-change-100.png"
              },
              {
                title: "Battery Replacement",
                desc: "Get your battery replaced without visiting the garage.",
                image: "public/images/icons8-battery-replacement-100.png",
              },
              {
                title: "Tire Service",
                desc: "We fix flat tires and offer tire rotations on-site.",
                image: "public\images\icons8-tire-100 (1).png",

              },
            ].map((service) => (
              <div key={service.title} className="service-card">
                <div className="service-card-content">
                  <div className="service-image">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="service-text">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
          </div>
          <div className="testimonials-content">
            <p>
              "Amazing service! Booked an oil change from my couch and they
              arrived in 20 mins!"
            </p>
            <p>
              "Professional, quick, and clean — I didn't have to move my car at
              all!"
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Need a Car Fix?</h2>
            <p>Start your booking now and get service at your doorstep!</p>
            <Link to="/RequestService">
              <button className="secondary-button">Book Now</button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;