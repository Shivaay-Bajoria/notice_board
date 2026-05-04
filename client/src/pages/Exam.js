import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Exams({ user }) {
    const [exams, setExams] = useState([]);
    const [courseCode, setCourseCode] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('Midterm');

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchExams();
        // eslint-disable-next-line
    }, []);

    const fetchExams = async () => {
        try {
            const res = await axios.get('[https://notice-board-gtem.onrender.com](https://notice-board-gtem.onrender.com)/api/exams', config);
            setExams(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddExam = async (e) => {
        e.preventDefault();
        try {
            await axios.post('[https://notice-board-gtem.onrender.com](https://notice-board-gtem.onrender.com)/api/exams', { courseCode, title, date, type }, config);
            setCourseCode(''); setTitle(''); setDate(''); fetchExams();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`[https://notice-board-gtem.onrender.com](https://notice-board-gtem.onrender.com)/api/exams/${id}`, config);
            fetchExams();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Exam Schedule</h2>
            <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Official calendar for upcoming assessments.</p>

            {user.role === 'faculty' && (
                <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                    <h4 style={{ marginTop: 0 }}>Schedule an Exam</h4>
                    <form onSubmit={handleAddExam}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder="Course Code (e.g., CS401)" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
                            <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '150px' }}>
                                <option value="Quiz">Quiz</option>
                                <option value="Midterm">Midterm</option>
                                <option value="Final">Final</option>
                                <option value="Practical">Practical</option>
                            </select>
                        </div>
                        <input type="text" placeholder="Exam Topic" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{ colorScheme: 'dark' }} />
                        <button type="submit" style={{ backgroundColor: '#10b981', background: 'none', border: '1px solid #10b981', color: '#10b981' }}>Add to Calendar</button>
                    </form>
                </div>
            )}

            {exams.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b' }}>No exams scheduled currently.</p>
            ) : (
                exams.map((exam) => {
                    const examDate = new Date(exam.date);
                    return (
                        <div key={exam._id} className="card" style={{ display: 'flex', padding: 0, overflow: 'hidden' }}>
                            <div style={{ background: '#0f172a', color: '#f8fafc', minWidth: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '15px', borderRight: '1px solid #334155' }}>
                                <span style={{ fontSize: '28px', fontWeight: 'bold', lineHeight: 1 }}>{examDate.getDate()}</span>
                                <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '5px' }}>{examDate.toLocaleString('default', { month: 'short' })}</span>
                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{examDate.getFullYear()}</span>
                            </div>
                            <div style={{ padding: '20px', flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ color: '#60a5fa', fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{exam.courseCode} &bull; {exam.type}</div>
                                    <h3 style={{ margin: '0 0 5px 0' }}>{exam.title}</h3>
                                    <small style={{ color: '#94a3b8' }}>Scheduled by: {exam.createdBy}</small>
                                </div>
                                {user.role === 'faculty' && (
                                    <button className="btn-danger" onClick={() => handleDelete(exam._id)}>Remove</button>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default Exams;