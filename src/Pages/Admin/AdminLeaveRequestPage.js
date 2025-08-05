import React from 'react';

export default function AdminLeaveRequestsPage({ leaveRequests, handleLeaveStatusUpdate, handleLogout }) {
    return (
        <div className="container py-4">
            <h2 className="mb-4">Admin - All Leave Requests</h2>

            <button className="btn btn-outline-secondary mb-3" onClick={handleLogout}>
                Logout
            </button>

            {leaveRequests.length === 0 ? (
                <p>No leave requests submitted yet.</p>
            ) : (
                <div className="list-group">
                    {leaveRequests.map((req) => (
                        <div key={req.id} className="list-group-item">
                            <p><strong>Name:</strong> {req.name}</p>
                            <p><strong>Reason:</strong> {req.reason}</p>
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
                                        onClick={() => handleLeaveStatusUpdate(req.id, "Accepted")}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleLeaveStatusUpdate(req.id, "Rejected")}
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
