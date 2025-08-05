import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage({ setLoggedInUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const user = await response.json();
      if (user && user.id && user.role === 'ADMIN') {
        setLoggedInUser(user);
        navigate('/admin-dashboard'); // You can create this page next
      } else {
        setMessage('Invalid admin credentials');
      }
    } catch (err) {
      setMessage('Login failed: ' + err.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control"
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control"
            value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-success" type="submit">Login</button>
        {message && <div className="alert alert-danger mt-2">{message}</div>}
      </form>
      <button className="btn btn-link mt-2" onClick={() => navigate('/admin-signup')}>
        New Admin? Register
      </button>
      <button className="btn btn-link mt-2" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}
