import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RequestFormPage({ formData, setFormData, handleSubmit }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.travel_location.trim()) newErrors.travel_location = "Travel location is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = "Amount must be greater than 0";
    if (!formData.travel_type) newErrors.travel_type = "Travel type is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";

    return newErrors;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validateFields();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setErrors({}); // Clear previous errors
    const safeFormData = { ...formData, amount: parseFloat(formData.amount) || 0 };
    handleSubmit(e, safeFormData);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Travel Request Reimbursement Form</h2>
      <form onSubmit={onFormSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        {/* Travel Location */}
        <div className="mb-3">
          <label className="form-label">Travel Location</label>
          <input
            className="form-control"
            value={formData.travel_location}
            onChange={e => setFormData({ ...formData, travel_location: e.target.value })}
            placeholder="Enter destination"
          />
          {errors.travel_location && <div className="text-danger">{errors.travel_location}</div>}
        </div>

        {/* Reason */}
        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            className="form-control"
            value={formData.reason}
            onChange={e => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Enter reason"
          />
          {errors.reason && <div className="text-danger">{errors.reason}</div>}
        </div>

        {/* Amount */}
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
          />
          {errors.amount && <div className="text-danger">{errors.amount}</div>}
        </div>

        {/* Travel Type */}
        <div className="mb-3">
          <label className="form-label">Travel Type</label>
          <select
            className="form-select"
            value={formData.travel_type || ''}
            onChange={e => setFormData({ ...formData, travel_type: e.target.value })}
          >
            <option value="">Select type</option>
            <option value="Business">Business</option>
            <option value="Personal">Personal</option>
          </select>
          {errors.travel_type && <div className="text-danger">{errors.travel_type}</div>}
        </div>

        {/* Dates */}
        <div className="mb-3">
          <label className="form-label">Travel/Leave Date Range</label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="date"
              className="form-control"
              value={formData.start_date || ''}
              onChange={e => setFormData({ ...formData, start_date: e.target.value })}
              style={{ maxWidth: 180 }}
            />
            <span className="mx-2">to</span>
            <input
              type="date"
              className="form-control"
              value={formData.end_date || ''}
              onChange={e => setFormData({ ...formData, end_date: e.target.value })}
              min={formData.start_date || undefined}
              style={{ maxWidth: 180 }}
            />
          </div>
          {errors.start_date && <div className="text-danger">{errors.start_date}</div>}
          {errors.end_date && <div className="text-danger">{errors.end_date}</div>}
        </div>

        {/* Submit */}
        <button className="btn btn-primary me-2" type="submit">Submit</button>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => navigate('/requests')}
        >
          View Previous Requests
        </button>
      </form>
    </div>
  );
}
