import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4">Welcome to HR Portal</h1>
      <div className="d-flex justify-content-center gap-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/employee-login')}
        >
          Employee
        </button>
        <button
          className="btn btn-success btn-lg"
          onClick={() => navigate('/admin-login')}
        >
          Admin
        </button>
      </div>
    </div>
  );
}
