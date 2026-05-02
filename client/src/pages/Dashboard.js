import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ user, setUser }) {
    const [notices, setNotices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Form States
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('General');
    const [isPinned, setIsPinned] = useState(false);

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchNotices();
        // eslint-disable-next-line
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await axios.get('http://localhost:3050/api/notices', config);
            setNotices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateNotice = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3050/api/notices', { title, description, category, isPinned }, config);
            setTitle(''); setDescription(''); setCategory('General'); setIsPinned(false);
            fetchNotices(); 
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3050/api/notices/${id}`, config);
            fetchNotices(); 
        } catch (err) {
            console.error(err);
        }
    };

    const handleLike = async (id) => {
        try {
            await axios.put(`http://localhost:3050/api/notices/${id}/like`, {}, config);
            fetchNotices(); 
        } catch (err) {
            console.error(err);
        }
    };

    const filteredNotices = notices.filter(notice => 
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getTimeAgo = (dateString) => {
        const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div>
            <div style={{ marginBottom: '25px' }}>
                <h2 style={{ margin: '0 0 5px 0' }}>
                    Welcome, {user.name} <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 'normal' }}>({user.role})</span>
                </h2>
                <p style={{ color: '#94a3b8', margin: 0 }}>Here is the latest from your campus board.</p>
            </div>

            {user.role === 'faculty' && (
                <div className="card" style={{ borderLeft: '4px solid #6366f1' }}>
                    <h4 style={{ marginTop: 0 }}>Post a New Notice</h4>
                    <form onSubmit={handleCreateNotice}>
                        <input type="text" placeholder="Notice Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="General">General</option>
                            <option value="Exam">Exam</option>
                            <option value="Event">Event</option>
                            <option value="Placement">Placement</option>
                        </select>
                        <textarea placeholder="Notice Details..." value={description} onChange={(e) => setDescription(e.target.value)} required style={{ height: '80px', resize: 'vertical' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                            <input type="checkbox" id="pin" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} style={{ width: 'auto', margin: 0, transform: 'scale(1.2)' }} />
                            <label htmlFor="pin" style={{ fontWeight: '500', color: '#e2e8f0' }}>Pin to top of feed</label>
                        </div>
                        <button type="submit">Publish Notice</button>
                    </form>
                </div>
            )}

            <input 
                type="text" 
                className="search-bar" 
                placeholder="Search notices by title, category, or keyword..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {filteredNotices.map((notice) => (
                <div key={notice._id} className={`card ${notice.isPinned ? 'pinned' : ''}`}>
                    {notice.isPinned && <span className="pin-icon">📌</span>}
                    <span className={`badge badge-${notice.category}`}>{notice.category}</span>
                    
                    <h3 style={{ margin: '0 0 10px 0' }}>{notice.title}</h3>
                    <p style={{ color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>{notice.description}</p>
                    
                    <div className="notice-meta">
                        <strong style={{ color: '#f8fafc' }}>{notice.authorName}</strong> &bull; {getTimeAgo(notice.createdAt)}
                    </div>
                    
                    <div className="notice-actions">
                        <button className="btn-like" onClick={() => handleLike(notice._id)}>
                            👍 Acknowledged {notice.likes > 0 && <span style={{background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '10px', marginLeft: '5px', color: '#f8fafc'}}>{notice.likes}</span>}
                        </button>

                        {user.role === 'faculty' && (
                            <button className="btn-danger" style={{ margin: 0 }} onClick={() => handleDelete(notice._id)}>Delete</button>
                        )}
                    </div>
                </div>
            ))}
            
            {filteredNotices.length === 0 && (
                <p style={{ textAlign: 'center', color: '#64748b', marginTop: '40px' }}>No notices found.</p>
            )}
        </div>
    );
}

export default Dashboard;