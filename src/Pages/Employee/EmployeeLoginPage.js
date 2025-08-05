import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeLoginPage({ setLoggedInUser }) {
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

      if (user && user.id && user.role === 'EMPLOYEE') {
        setLoggedInUser(user);
        navigate('/dashboard');  // ✅ Redirect to employee dashboard
      } else {
        setMessage('Invalid employee credentials');
      }
    } catch (err) {
      setMessage('Login failed: ' + err.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Employee Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">Login</button>

        {message && <div className="alert alert-danger mt-2">{message}</div>}

        <button
          className="btn btn-link mt-2"
          type="button"
          onClick={() => navigate('/signup')}
        >
          New user? Sign Up
        </button>
      </form>
    </div>
  );
}
