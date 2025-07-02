// src/pages/Hospitals.jsx
import React from 'react';

const Hospitals = () => {
  // Sample static data for now — you can replace with live API later
  const hospitals = [
    { name: 'Saint Louis Medical Center', address: '1234 Main St, St. Louis, MO', availability: 'Appointments available' },
    { name: 'Unity HealthCare', address: '5678 West Ave, St. Louis, MO', availability: 'Next available: Tomorrow' },
    { name: 'North County Hospital', address: '9012 Broadway Blvd, St. Louis, MO', availability: 'Walk-ins welcome' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Nearby Hospitals</h2>
      <ul style={styles.list}>
        {hospitals.map((hospital, index) => (
          <li key={index} style={styles.card}>
            <h3>{hospital.name}</h3>
            <p>{hospital.address}</p>
            <p style={styles.availability}>{hospital.availability}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#007bff',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  availability: {
    color: '#28a745',
    fontWeight: 'bold',
  },
};

export default Hospitals;
