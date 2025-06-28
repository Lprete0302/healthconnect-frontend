import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load user's appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get('/appointments/me');
        setAppointments(res.data);
      } catch (err) {
        setError('Failed to load appointments');
      }
    };

    fetchAppointments();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await API.post('/appointments', form);
      setSuccess('Appointment booked!');
      setForm({ doctor: '', date: '', time: '', reason: '' });

      // Refresh list
      const res = await API.get('/appointments/me');
      setAppointments(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="doctor"
          placeholder="Doctor's Name"
          value={form.doctor}
          onChange={handleChange}
          required
        />
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
          placeholder="Reason for visit"
          value={form.reason}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <h3 style={{ marginTop: '2rem' }}>My Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              <strong>Doctor:</strong> {appt.doctor}<br />
              <strong>Date:</strong> {appt.date}<br />
              <strong>Time:</strong> {appt.time}<br />
              <strong>Reason:</strong> {appt.reason}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;
