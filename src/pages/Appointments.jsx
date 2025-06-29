import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ date: '', time: '', reason: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments/me');
      setAppointments(res.data);
    } catch (err) {
      console.error('Failed to load appointments');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, time, reason } = form;
    if (!date || !time || !reason) {
      setError('All fields are required');
      return;
    }

    try {
      const fullDateTime = `${date}T${time}`;
      await API.post('/appointments', {
        user: user._id,
        date: fullDateTime,
        reason,
      });
      setSuccess('Appointment booked!');
      setError('');
      setForm({ date: '', time: '', reason: '' });
      fetchAppointments(); // Refresh list
    } catch (err) {
      setError('Server error');
      setSuccess('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <h3>My Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              {new Date(appt.date).toLocaleString()} — {appt.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;
