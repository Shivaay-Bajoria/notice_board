import React from 'react';

function Profile({ user }) {
    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h2>My Account settings</h2>
            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                    <div className="profile-avatar" style={{ width: '80px', height: '80px', fontSize: '32px', background: 'linear-gradient(135deg, #4f46e5, #3b82f6)' }}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ margin: 0 }}>{user.name}</h2>
                        <span className={`badge ${user.role === 'faculty' ? 'badge-Placement' : 'badge-Event'}`}>
                            {user.role.toUpperCase()}
                        </span>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #334155', margin: '20px 0' }} />
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '5px' }}>Registered Email</label>
                    <input type="text" value={user.email || 'Hidden for security'} disabled style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', color: '#64748b', cursor: 'not-allowed' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '5px' }}>Account ID</label>
                    <input type="text" value={user.id} disabled style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', color: '#64748b', cursor: 'not-allowed' }} />
                </div>
            </div>
        </div>
    );
}

export default Profile;