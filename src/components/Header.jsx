// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>➕</span>
        <span style={styles.logoText}>HealthConnect</span>
      </div>
      <nav style={styles.nav}>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.linkFilled}>Register</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #eee',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#003366',
    display: 'flex',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: '0.5rem',
    fontSize: '1.25rem',
  },
  logoText: {
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    padding: '0.4rem 1rem',
    border: '1px solid #003366',
    color: '#003366',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
  },
  linkFilled: {
    padding: '0.4rem 1rem',
    backgroundColor: '#003366',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Header;
