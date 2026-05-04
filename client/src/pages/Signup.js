import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        
        try {
            await axios.post('https://notice-board-gtem.onrender.com/api/auth/register', { name, email, password, role });
            setMessage('Account created! Redirecting to login...');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed.');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-glass-card">
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p>Register for the Velox OMS portal</p>
                </div>

                {message && <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', padding: '10px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '14px' }}>{message}</div>}
                {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '14px' }}>{error}</div>}

                <form onSubmit={handleSignup}>
                    <div className="auth-input-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="auth-input-group">
                        <label>University Email</label>
                        <input type="email" placeholder="name@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="auth-input-group">
                        <label>Secure Password</label>
                        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    
                    <div className="auth-input-group">
                        <label>Account Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="faculty">Faculty Member</option>
                        </select>
                    </div>

                    <button type="submit" className="auth-submit-btn">Register Account</button>
                </form>

                <div className="auth-footer-text">
                    Already registered? <Link to="/">Return to Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;