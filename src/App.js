// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import EmployeeLoginPage from './Pages/Employee/EmployeeLoginPage';
import RequestFormPage from './Pages/Employee/EmployeeReimbursementRequestFormPage';
import ViewRequestPage from './Pages/Employee/EmployeeeHistoryViewRequestPage';
import EmployeeSignupPage from './Pages/Employee/EmployeeSignupPage';
import HomeDashboardPage from './Pages/HomeDashboardPage';
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import AdminSignupPage from './Pages/Admin/AdminSignupPage';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminReimbursementPage from './Pages/Admin/AdminReimbursementPage';
import AdminLeaveRequestPage from './Pages/Admin/AdminLeaveRequestPage';
import LeaveRequestFormPage from './Pages/Employee/EmployeeLeaveRequestFormPage';
import EmployeeDashboard from './Pages/Employee/EmployeeDashboard';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    travel_location: "",
    reason: "",
    travel_type: "",
    start_date: "",
    end_date: "",
    amount: ""
  });

  const [requests, setRequests] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [message, setMessage] = useState('');

  // 🔹 Fetch Reimbursement Requests
  const fetchRequests = () => {
    fetch('http://localhost:8080/api/travel-request')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(() => setRequests([]));
  };

  // 🔹 Fetch Leave Requests
  const fetchLeaveRequests = () => {
    fetch('http://localhost:8080/api/leave-request')
      .then(res => res.json())
      .then(data => setLeaveRequests(data))
      .catch(() => setLeaveRequests([]));
  };

  // 🔹 Load data based on user role
  useEffect(() => {
    if (loggedInUser?.role === 'ADMIN') {
      fetchRequests();
      fetchLeaveRequests();
    } else if (loggedInUser?.role === 'EMPLOYEE') {
      fetchRequests();
    }
  }, [loggedInUser]);

  // 🔹 Submit Travel Reimbursement
  const handleSubmit = async (e) => {
    e.preventDefault();
    const safeAmount = parseFloat(formData.amount) || 0;
    const payload = {
      ...formData,
      amount: safeAmount,
      user_id: loggedInUser.id
    };
    try {
      const response = await fetch('http://localhost:8080/api/travel-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setMessage('Travel request submitted successfully!');
        setFormData({ name: "", travel_location: "", reason: "", travel_type: "", start_date: "", end_date: "", amount: "" });
        fetchRequests();
      } else {
        setMessage('Submission failed.');
      }
    } catch (err) {
      setMessage('Server error: ' + err.message);
    }
  };

  // 🔹 Update Reimbursement Request Status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/travel-request/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) fetchRequests();
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  // 🔹 Update Leave Request Status
  const handleLeaveStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/leave-request/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatus)  // backend expects raw string like "Accepted"
      });
      if (response.ok) fetchLeaveRequests();
    } catch (err) {
      alert('Failed to update leave status');
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    setLoggedInUser(null);
    setFormData({ name: "", travel_location: "", reason: "", travel_type: "", start_date: "", end_date: "", amount: "" });
    setRequests([]);
    setLeaveRequests([]);
    setMessage('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeDashboardPage />} />
        <Route path="/employee-login" element={<EmployeeLoginPage setLoggedInUser={setLoggedInUser} />} />
        <Route path="/admin-login" element={<AdminLoginPage setLoggedInUser={setLoggedInUser} />} />
        <Route path="/signup" element={<EmployeeSignupPage />} />
        <Route path="/admin-signup" element={<AdminSignupPage />} />

        {/* Employee Dashboard */}
        <Route path="/dashboard" element={
          loggedInUser ? <EmployeeDashboard /> : <Navigate to="/employee-login" replace />
        } />

        {/* Employee Reimbursement Form */}
        <Route path="/travel-request-form" element={
          loggedInUser ? (
            <RequestFormPage
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              message={message}
              setMessage={setMessage}
              loggedInUser={loggedInUser}
              handleLogout={handleLogout}
            />
          ) : <Navigate to="/employee-login" replace />
        } />

        {/* Employee Leave Form */}
        <Route path="/leave-request-form" element={
          loggedInUser ? <LeaveRequestFormPage /> : <Navigate to="/employee-login" replace />
        } />

        {/* Employee History Page */}
        <Route path="/requests" element={
          loggedInUser ? (
            <ViewRequestPage
              requests={requests}
              fetchRequests={fetchRequests}
              loggedInUser={loggedInUser}
              handleLogout={handleLogout}
            />
          ) : <Navigate to="/employee-login" replace />
        } />

        {/* Admin Dashboard with navigation buttons */}
        <Route path="/admin-dashboard" element={
          loggedInUser?.role === "ADMIN"
            ? <AdminDashboard handleLogout={handleLogout} />
            : <Navigate to="/admin-login" replace />
        } />

        {/* Admin Reimbursement Review */}
        <Route path="/admin-reimbursement" element={
          loggedInUser?.role === "ADMIN"
            ? <AdminReimbursementPage
                requests={requests}
                handleStatusUpdate={handleStatusUpdate}
                handleLogout={handleLogout}
              />
            : <Navigate to="/admin-login" replace />
        } />

        {/* Admin Leave Review */}
        <Route path="/admin-leave" element={
          loggedInUser?.role === "ADMIN"
            ? <AdminLeaveRequestPage
                leaveRequests={leaveRequests}
                handleLeaveStatusUpdate={handleLeaveStatusUpdate}
                handleLogout={handleLogout}
              />
            : <Navigate to="/admin-login" replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
