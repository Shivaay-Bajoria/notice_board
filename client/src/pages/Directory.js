import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Directory() {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const res = await axios.get('http://localhost:3050/api/auth/faculty');
                setFaculty(res.data);
            } catch (err) {
                console.error("Error fetching directory", err);
            }
        };
        fetchFaculty();
    }, []);

    return (
        <div>
            <h2>Faculty Directory</h2>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Contact information for university department heads and professors.</p>
            
            <div className="grid-container">
                {faculty.map(prof => (
                    <div key={prof._id} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div className="profile-avatar" style={{ background: 'linear-gradient(135deg, #4f46e5, #3b82f6)' }}>
                            {prof.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 style={{ margin: '0 0 5px 0' }}>{prof.name}</h3>
                        <span className="badge badge-General" style={{ background: 'rgba(255,255,255,0.05)', color: '#e2e8f0' }}>Faculty Member</span>
                        <a href={`mailto:${prof.email}`} style={{ marginTop: '15px', color: '#60a5fa', textDecoration: 'none' }}>
                            {prof.email}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Directory;