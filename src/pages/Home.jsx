// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header />

      <div className="home-hero">
        <h1 className="home-title">HealthConnect</h1>
        <p className="home-subtitle">Find the best hospitals and ambulance services near you</p>
        <p className="home-tagline">Your smart solution for booking healthcare appointments</p>

        <p className="home-notice">
          🚨 If you are experiencing an emergency, please call 911 immediately.
        </p>

        <div className="home-buttons">
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/register" className="btn register">Register</Link>
          <Link to="/hospitals" className="btn hospitals">Hospitals</Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
