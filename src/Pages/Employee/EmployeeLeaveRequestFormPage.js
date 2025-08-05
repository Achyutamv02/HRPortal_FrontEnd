import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LeaveRequestFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    reason: '',
    start_date: '',
    end_date: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = validateFields();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/leave-request", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const text = await response.text();
      setMessage(text);

      if (response.ok) {
        setFormData({
          name: '',
          reason: '',
          start_date: '',
          end_date: ''
        });
        setErrors({});
      }
    } catch (error) {
      setMessage("Error submitting leave request");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Leave Request Form</h2>

      <form onSubmit={handleSubmit}>
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

        {/* Dates */}
        <div className="mb-3">
          <label className="form-label">Leave Dates</label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="date"
              className="form-control"
              value={formData.start_date}
              onChange={e => setFormData({ ...formData, start_date: e.target.value })}
              style={{ maxWidth: 180 }}
            />
            <span className="mx-2">to</span>
            <input
              type="date"
              className="form-control"
              value={formData.end_date}
              onChange={e => setFormData({ ...formData, end_date: e.target.value })}
              min={formData.start_date}
              style={{ maxWidth: 180 }}
            />
          </div>
          {errors.start_date && <div className="text-danger">{errors.start_date}</div>}
          {errors.end_date && <div className="text-danger">{errors.end_date}</div>}
        </div>

        {/* Submit */}
        <button className="btn btn-success me-2" type="submit">Submit</button>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </form>
    </div>
  );
}
