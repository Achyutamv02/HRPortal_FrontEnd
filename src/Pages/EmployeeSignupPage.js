import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeSignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async e => {
    e.preventDefault();
    const payload = { ...form, role: "EMPLOYEE" };
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.text();
      if (result === "User created!") {
        setMessage('Signup successful! Please login.');
        setTimeout(() => navigate('/employee-login'), 1200);
      } else {
        setMessage(result || 'Signup failed.');
      }
    } catch (err) {
      setMessage('Server error: ' + err.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Employee Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-3">
          <label>Name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <input className="form-control" value="EMPLOYEE" disabled readOnly />
        </div>
        <button className="btn btn-primary" type="submit">Sign Up</button>
        {message && <div className="alert alert-info mt-2">{message}</div>}
      </form>
      <button className="btn btn-link mt-2" onClick={() => navigate('/employee-login')}>Back to Login</button>
    </div>
  );
}
