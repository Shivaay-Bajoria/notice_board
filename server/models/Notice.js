// backend/models/Notice.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorName: { type: String, required: true },
    category: { type: String, enum: ['General', 'Exam', 'Event', 'Placement'], default: 'General' },
    isPinned: { type: Boolean, default: false },
    likes: { type: Number, default: 0 }, // <-- ADD THIS LINE
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', noticeSchema);