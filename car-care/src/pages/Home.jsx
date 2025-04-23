import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-[#1A1A2E] text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold">We Bring Car Care to You 🚗🛠️</h1>
          <p className="mt-4 text-lg md:text-xl text-[#F1F5F9]">
            Book professional car services from the comfort of your home.
          </p>
          <Link to="/RequestService">
            <button className="mt-6 px-8 py-3 bg-[#F1F5F9] text-[#2385C4] font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition transform hover:scale-105">
              Request a Service
            </button>
          </Link>
        </section>

        {/* Our Services */}
        <section className="py-20 bg-[#F1F5F9]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#1A1A2E]">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

              <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold">Oil Change</h3>
                <p className="mt-2 text-gray-700">Fast and affordable oil changes at your home.</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold">Battery Replacement</h3>
                <p className="mt-2 text-gray-700">Get your battery replaced without visiting the garage.</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold">Tire Service</h3>
                <p className="mt-2 text-gray-700">We fix flat tires and offer tire rotations on-site.</p>
              </div>

            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#1A1A2E]">What Our Customers Say</h2>
            <p className="text-gray-600 italic mb-6">"Amazing service! Booked an oil change from my couch and they arrived in 20 mins!"</p>
            <p className="text-gray-600 italic">"Professional, quick, and clean — I didn’t have to move my car at all!"</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-[#F1F5F9]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A2E]">Need a Car Fix?</h2>
            <p className="text-gray-700 mb-4">Start your booking now and get service at your doorstep!</p>
            <Link to="/RequestService">
              <button className="mt-4 px-8 py-3 bg-[#2385C4] text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
                Book Now
              </button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Home;
