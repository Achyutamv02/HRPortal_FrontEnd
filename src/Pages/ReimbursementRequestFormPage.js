import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RequestFormPage({ formData, setFormData, handleSubmit, message }) {
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();
    // Ensure amount is always a number
    const safeFormData = { ...formData, amount: parseFloat(formData.amount) || 0 };
    handleSubmit(e, safeFormData); // Pass the sanitized form data up
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Travel Request Reimbursement Form</h2>
      <form onSubmit={onFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Travel Location</label>
          <input
            className="form-control"
            value={formData.travel_location}
            onChange={e => setFormData({ ...formData, travel_location: e.target.value })}
            placeholder="Enter destination"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            className="form-control"
            value={formData.reason}
            onChange={e => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Enter reason"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={formData.amount}
            onChange={e => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Travel Type</label>
          <select
            className="form-select"
            value={formData.travel_type || ''}
            onChange={e => setFormData({ ...formData, travel_type: e.target.value })}
            required
          >
            <option value="">Select type</option>
            <option value="Business">Business</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Travel/Leave Date Range</label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="date"
              className="form-control"
              value={formData.start_date || ''}
              onChange={e => setFormData({ ...formData, start_date: e.target.value })}
              required
              style={{ maxWidth: 180 }}
            />
            <span className="mx-2">to</span>
            <input
              type="date"
              className="form-control"
              value={formData.end_date || ''}
              onChange={e => setFormData({ ...formData, end_date: e.target.value })}
              required
              min={formData.start_date || undefined}
              style={{ maxWidth: 180 }}
            />
          </div>
        </div>
        <button className="btn btn-primary me-2" type="submit">Submit</button>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => navigate('/requests')}
        >
          View Previous Requests
        </button>
      </form>
      {message && (
        <div className="alert alert-info mt-3">{message}</div>
      )}
    </div>
  );
}
