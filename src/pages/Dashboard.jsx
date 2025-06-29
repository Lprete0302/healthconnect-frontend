import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token, user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin' || user?.role === 'doctor';

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          isAdmin
            ? 'https://healthconnect-backend.onrender.com/api/appointments'
            : 'https://healthconnect-backend.onrender.com/api/appointments/me',
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
        `https://healthconnect-backend.onrender.com/api/appointments/${id}`,
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

  const toggleSortOrder = () => {
    setSortAsc((prev) => !prev);
  };

  const filteredAppointments = appointments
    .filter((appt) =>
      appt.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(appt.date).toLocaleDateString().includes(searchTerm)
    )
    .filter((appt) => !statusFilter || appt.status === statusFilter)
    .sort((a, b) =>
      sortAsc
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user?.name || 'User'}!</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleLogout}>Logout</button>
        {!isAdmin && (
          <button
            onClick={handleBookClick}
            style={{
              marginLeft: '1rem',
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
      </div>

      <div style={{ margin: '1rem 0' }}>
        <input
          type="text"
          placeholder="Search by reason or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginRight: '1rem' }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button onClick={toggleSortOrder}>
          Sort by Date {sortAsc ? '↑' : '↓'}
        </button>
      </div>

      <h3>{isAdmin ? 'All Appointments' : 'Your Appointments'}</h3>

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : filteredAppointments.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          No appointments found. Book your first one today!
        </p>
      ) : (
        <ul>
          {filteredAppointments.map((appt) => (
            <li key={appt._id} style={{ marginBottom: '1rem' }}>
              {isAdmin && (
                <>
                  <strong>User:</strong> {appt.user?.name || 'N/A'} <br />
                </>
              )}
              <strong>Date:</strong> {new Date(appt.date).toLocaleString()} <br />
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
