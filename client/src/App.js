import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Exams from './pages/Exam';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Directory from './pages/Directory';
import Profile from './pages/Profile';
import Resources from './pages/Resource';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Navbar will automatically hide if the user is not logged in */}
        <Navbar user={user} setUser={setUser} />
        
        {!user && <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Campus Notice Board</h2>}

        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/" />} />
          
          {/* New Routes */}
          <Route path="/directory" element={user ? <Directory /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/" />} />
          <Route path="/Exam" element={user ? <Exams user={user} /> : <Navigate to="/" />} />
          <Route path="/Resource" element={user ? <Resources user={user} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;