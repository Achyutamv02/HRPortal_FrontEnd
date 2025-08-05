import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard({ handleLogout }) {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="d-flex flex-column gap-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin-reimbursement')}
        >
          Reimbursement Requests
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate('/admin-leave')}
        >
          Leave Requests
        </button>

        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
