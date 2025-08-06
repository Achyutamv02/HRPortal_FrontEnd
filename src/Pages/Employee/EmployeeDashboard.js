import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="mb-4">Employee Dashboard</h2>

      <div className="d-flex flex-column gap-3">
        <button className="btn btn-primary" onClick={() => navigate('/travel-request-form')}>
          Travel Reimbursement Form
        </button>

        <button className="btn btn-secondary" onClick={() => navigate('/leave-request-form')}>
          Leave Request Form
        </button>

        <button className="btn btn-outline-danger" onClick={() => navigate('/employee-login')}>
          Logout
        </button>
        
      </div>
    </div>
  );
}
