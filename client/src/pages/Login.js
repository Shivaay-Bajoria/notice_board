import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3050/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-glass-card">
                <div className="auth-header">
                    <h2>CampusBoard</h2>
                    <p>Enter your credentials to access the portal</p>
                </div>

                {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '14px' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="auth-input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@university.edu" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="auth-input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <button type="submit" className="auth-submit-btn">Secure Login</button>
                </form>

                <div className="auth-footer-text">
                    Don't have an account? <Link to="/signup">Request Access</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;