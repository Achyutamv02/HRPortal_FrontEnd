import React from 'react';

export default function AdminReimbursementPage({ requests, handleStatusUpdate, handleLogout }) {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Admin - All Travel Reimbursement Requests</h2>

      <button className="btn btn-outline-secondary mb-3" onClick={handleLogout}>
        Logout
      </button>

      {requests.length === 0 ? (
        <p>No reimbursement requests submitted yet.</p>
      ) : (
        <div className="list-group">
          {[...requests]
            .sort((a, b) => (a.status === "Pending" ? -1 : 1))
            .map((req) => (
              <div key={req.id} className="list-group-item">
                <p><strong>Name:</strong> {req.name}</p>
                <p><strong>Travel Location:</strong> {req.travel_location}</p>
                <p><strong>Justification:</strong> {req.reason}</p>
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

                {req.status === "Pending" && (
                  <div className="mt-2">
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleStatusUpdate(req.id, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleStatusUpdate(req.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
