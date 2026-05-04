import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/');
    };

    if (!user) return null; // Don't show navbar on login/signup screens

    return (
        <nav className="navbar">
            <h3 style={{ color: 'white', margin: 0 }}>Velox OMS</h3>
            <div className="nav-links">
                <Link to="/Dashboard">Notice Feed</Link>
                <Link to="/Exam">Exam Calendar</Link>
                <Link to="/Resource">Study Materials</Link>
                <Link to="/Directory">Faculty Directory</Link>
                <Link to="/Profile">My Profile</Link>
                <button onClick={handleLogout} style={{ background: 'transparent', width: 'auto', padding: 0, color: '#ef4444' }}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;