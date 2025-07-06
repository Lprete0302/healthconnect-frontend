// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heroImage from '../assets/healthconnect.png'; // ✅ Make sure this file exists and has no spaces

const Home = () => {
  return (
    <>
      <Header />

      <main style={styles.hero}>
        <section style={styles.left}>
          <h1 style={styles.title}>Welcome to HealthConnect</h1>
          <p style={styles.subtitle}>Your health, our priority.</p>
          <Link to="/hospitals" style={styles.getStarted}>Get Started</Link>
        </section>

        <section style={styles.right}>
          <img src={heroImage} alt="HealthConnect Hero" style={styles.image} />
        </section>
      </main>

      <nav style={styles.buttons}>
        <Link to="/login" style={styles.login}>Login</Link>
        <Link to="/register" style={styles.register}>Register</Link>
      </nav>

      <Footer />
    </>
  );
};

const styles = {
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem',
    flexWrap: 'wrap',
  },
  left: {
    flex: '1 1 50%',
    paddingRight: '1rem',
  },
  right: {
    flex: '1 1 45%',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#003366',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '1rem',
  },
  getStarted: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#003366',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    margin: '2rem 0',
  },
  login: {
    padding: '0.5rem 1.2rem',
    border: '1px solid #003366',
    color: '#003366',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
  },
  register: {
    padding: '0.5rem 1.2rem',
    backgroundColor: '#003366',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Home;
