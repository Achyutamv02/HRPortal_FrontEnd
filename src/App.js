import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeLoginPage from './Pages/EmployeeLoginPage';
import RequestFormPage from './Pages/ReimbursementRequestFormPage';
import ViewRequestPage from './Pages/ViewRequestPage';
import EmployeeSignupPage from './Pages/EmployeeSignupPage';
import HomeDashboardPage from './Pages/HomeDashboardPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminSignupPage from './Pages/AdminSignupPage';
import AdminDashboardPage from './Pages/AdminDashboardPage';

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
  const [message, setMessage] = useState('');

  // Fetch requests when logged in
  const fetchRequests = () => {
    fetch('http://localhost:8080/api/travel-request')
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(() => setRequests([]));
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchRequests();
    }
  }, [loggedInUser]);

  // Handle travel request submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure amount is a valid number
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
        setFormData({
          name: "",
          travel_location: "",
          reason: "",
          travel_type: "",
          start_date: "",
          end_date: "",
          amount: ""
        });
        fetchRequests();
      } else {
        setMessage('Submission failed. Please try again.');
      }
    } catch (err) {
      setMessage('Server error: ' + err.message);
    }
  };

  // Admin/Manager: update request status in DB
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/api/travel-request/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchRequests();
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  // Logout function
  const handleLogout = () => {
    setLoggedInUser(null);
    setFormData({
      name: "",
      travel_location: "",
      reason: "",
      travel_type: "",
      start_date: "",
      end_date: "",
      amount: ""
    });
    setRequests([]);
    setMessage('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeDashboardPage />} />
        <Route path="/travel-request-form" element={
          loggedInUser
            ? <RequestFormPage
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              message={message}
              loggedInUser={loggedInUser}
              handleLogout={handleLogout}
            />
            : <Navigate to="/employee-login" replace />
        } />


        <Route path="/employee-login" element={<EmployeeLoginPage setLoggedInUser={setLoggedInUser} />} />
        <Route path="/admin-login" element={<AdminLoginPage setLoggedInUser={setLoggedInUser} />} />
        <Route path="/signup" element={<EmployeeSignupPage />} />
        <Route path="/admin-signup" element={<AdminSignupPage />} />
        <Route path="/requests"
          element={
            loggedInUser
              ? <ViewRequestPage
                requests={requests}
                fetchRequests={fetchRequests}
                loggedInUser={loggedInUser}
                handleLogout={handleLogout}
              />
              : <Navigate to="/employee-login" replace />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            loggedInUser && loggedInUser.role === "ADMIN"
              ? <AdminDashboardPage
                requests={requests}
                fetchRequests={fetchRequests}
                handleStatusUpdate={handleStatusUpdate}
                loggedInUser={loggedInUser}
                handleLogout={handleLogout}
              />
              : <Navigate to="/admin-login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
