import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin' || user?.role === 'doctor';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          isAdmin
            ? 'http://localhost:5001/api/appointments'
            : 'http://localhost:5001/api/appointments/me',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAppointments(res.data);
      } catch (err) {
        setError('Could not fetch appointments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAppointments();
  }, [token, isAdmin]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleBookClick = () => {
    navigate('/appointments');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/appointments/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user?.name || 'User'}!</h2>

      <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>
        Logout
      </button>

      {!isAdmin && (
        <button
          onClick={handleBookClick}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Book New Appointment
        </button>
      )}

      <h3>{isAdmin ? 'All Appointments' : 'Your Appointments'}</h3>

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id} style={{ marginBottom: '1rem' }}>
              <strong>User:</strong> {appt.user?.name || 'N/A'} <br />
              <strong>Date:</strong>{' '}
              {new Date(appt.date).toLocaleString()} <br />
              <strong>Reason:</strong> {appt.reason} <br />
              <strong>Status:</strong> {appt.status}
              {isAdmin && (
                <>
                  <br />
                  <select
                    value={appt.status}
                    onChange={(e) =>
                      handleStatusChange(appt._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
