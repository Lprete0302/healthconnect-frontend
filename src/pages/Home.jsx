// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heroImage from '../assets/hero-banner.png'; // if needed

const Home = () => {
  return (
    <>
      <Header />

      <div className="home" style={styles.hero}>
        <h1 style={styles.title}>HealthConnect</h1>
        <p style={styles.subtitle}>Find the best hospitals and ambulance services near you</p>
        <p style={styles.tagline}>Your smart solution for booking healthcare appointments</p>

        <p style={styles.notice}>
          🚨 If you are experiencing an emergency, please call 911 immediately.
        </p>

        <div style={styles.buttons}>
          <Link to="/login" style={styles.login}>Login</Link>
          <Link to="/register" style={styles.register}>Register</Link>
          <Link to="/hospitals" style={styles.hospitals}>Hospitals</Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  hero: {
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '6rem 1rem',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#fff',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  tagline: {
    fontSize: '1.1rem',
    marginBottom: '2rem',
  },
  notice: {
    color: '#ff4d4f',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  login: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  register: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  hospitals: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
};

export default Home;
