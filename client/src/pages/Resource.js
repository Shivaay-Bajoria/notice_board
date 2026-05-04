import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Resources({ user }) {
    const [resources, setResources] = useState([]);
    const [courseCode, setCourseCode] = useState('');
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchResources();
        // eslint-disable-next-line
    }, []);

    const fetchResources = async () => {
        try {
            const res = await axios.get('https://notice-board-gtem.onrender.com/api/resources', config);
            setResources(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddResource = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://notice-board-gtem.onrender.com/api/resources', { courseCode, title, link }, config);
            setCourseCode(''); setTitle(''); setLink(''); fetchResources();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://notice-board-gtem.onrender.com/api/resources/${id}`, config);
            fetchResources();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Study Material & Resources</h2>
            <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Access lecture notes, past papers, and official course documents.</p>

            {user.role === 'faculty' && (
                <div className="card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                    <h4 style={{ marginTop: 0 }}>Upload Course Material</h4>
                    <form onSubmit={handleAddResource}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required style={{ flex: 1 }} />
                            <input type="text" placeholder="Material Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ flex: 2 }} />
                        </div>
                        <input type="url" placeholder="Document Link (Google Drive, Dropbox, etc.)" value={link} onChange={(e) => setLink(e.target.value)} required />
                        <button type="submit" style={{ backgroundColor: 'transparent', border: '1px solid #8b5cf6', color: '#c4b5fd' }}>Share Resource</button>
                    </form>
                </div>
            )}

            {resources.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b' }}>No materials have been uploaded yet.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {resources.map((resource) => (
                        <div key={resource._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '32px', marginBottom: '15px', background: 'rgba(255,255,255,0.05)', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>📄</div>
                                {user.role === 'faculty' && (
                                    <button onClick={() => handleDelete(resource._id)} style={{ background: 'none', color: '#ef4444', width: 'auto', padding: '0', fontSize: '12px' }}>Remove</button>
                                )}
                            </div>
                            
                            <span className="badge badge-General" style={{ width: 'fit-content', marginBottom: '10px' }}>{resource.courseCode}</span>
                            <h3 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{resource.title}</h3>
                            <small style={{ color: '#94a3b8', flexGrow: 1 }}>Uploaded by: {resource.uploadedBy}</small>
                            
                            <a href={resource.link} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#60a5fa', textAlign: 'center', textDecoration: 'none', padding: '10px', borderRadius: '6px', fontWeight: '500', marginTop: '15px', border: '1px solid rgba(59,130,246,0.2)' }}>
                                Open Document ↗
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Resources;