import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [form, setForm] = useState({ date: '', time: '', reason: '' });
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [appointments, search, sortOrder]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments/me');
      setAppointments(res.data);
    } catch (err) {
      console.error('Failed to load appointments');
    }
  };

  const applyFilters = () => {
    let filtered = [...appointments];

    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (appt) =>
          appt.reason.toLowerCase().includes(query) ||
          new Date(appt.date).toLocaleString().toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
    });

    setFilteredAppointments(filtered);
  };

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
      fetchAppointments();
    } catch (err) {
      setError('Server error');
      setSuccess('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="time" name="time" value={form.time} onChange={handleChange} required />
        <input type="text" name="reason" placeholder="Reason" value={form.reason} onChange={handleChange} required />
        <button type="submit">Book Appointment</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search appointments..."
          value={search}
          onChange={handleSearchChange}
        />
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Sort by date (Ascending)</option>
          <option value="desc">Sort by date (Descending)</option>
        </select>
      </div>

      <h3>My Appointments</h3>
      {filteredAppointments.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          No appointments yet — your health journey starts here!
        </p>
      ) : (
        <ul>
          {filteredAppointments.map((appt) => (
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
