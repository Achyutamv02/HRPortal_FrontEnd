import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewRequestsPage({ requests, updateStatus }) {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h2 className="mb-4">Previous Travel Requests</h2>
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate('/')}>
        Back to Request Form
      </button>

      {requests.length === 0 ? (
        <p>No requests submitted yet.</p>
      ) : (
        <div className="list-group">
          {requests.map((req, idx) => (
            <div key={idx} className="list-group-item">
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Travel Location:</strong> {req.travel_location}</p>
              <p><strong>Reason:</strong> {req.reason}</p>
              <p><strong>Travel Type:</strong> {req.travel_type}</p>
              <p><strong>Amount:</strong> {req.amount ? `₹${req.amount}` : "—"}</p>

              <p>
  <strong>Date:</strong>{" "}
  {req.start_date
    ? req.end_date
      ? `${req.start_date} to ${req.end_date}`
      : req.start_date
    : "—"}
</p>

              <p><strong>Status:</strong> {req.status}</p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
