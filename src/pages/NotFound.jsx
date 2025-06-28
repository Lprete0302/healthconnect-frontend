import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.message}>Oops! Page not found.</p>
      <Link to="/" style={styles.link}>Return to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '5rem',
    backgroundColor: '#fff3f3',
    height: '100vh',
  },
  code: {
    fontSize: '5rem',
    color: '#ff4d4f',
  },
  message: {
    fontSize: '1.5rem',
    color: '#555',
    margin: '1rem 0',
  },
  link: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  }
};

export default NotFound;
