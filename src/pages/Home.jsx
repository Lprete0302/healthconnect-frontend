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

      <div className="home">
        <h1 style={styles.logo}>HealthConnect</h1>
        <p style={styles.tagline}>Your smart solution for booking healthcare appointments</p>
        <div>
          <Link to="/login" style={styles.button}>Login</Link>
          <Link to="/register" style={{ ...styles.button, backgroundColor: '#28a745' }}>Register</Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  logo: {
    color: '#007bff',
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  tagline: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#333'
  },
  button: {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: '0.75rem 1.5rem',
    borderRadius: '5px',
    margin: '0 1rem',
    fontWeight: 'bold'
  }
};

export default Home;
