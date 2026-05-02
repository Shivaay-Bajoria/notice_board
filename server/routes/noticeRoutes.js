const express = require('express');
const Notice = require('../models/Notice');
const { protect, facultyOnly } = require('../middleware/auth');
const router = express.Router();

// Get all notices (Students and Faculty)

// Get all notices (Sorted by Pinned first, then Date)
router.get('/', protect, async (req, res) => {
    try {
        const notices = await Notice.find().sort({ isPinned: -1, createdAt: -1 });
        res.json(notices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a notice
router.post('/', protect, facultyOnly, async (req, res) => {
    const { title, description, category, isPinned } = req.body;
    try {
        const newNotice = new Notice({ 
            title, 
            description, 
            category, 
            isPinned, 
            authorName: req.user.name 
        });
        await newNotice.save();
        res.status(201).json(newNotice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a notice (Faculty Only)
router.delete('/:id', protect, facultyOnly, async (req, res) => {
    try {
        await Notice.findByIdAndDelete(req.params.id);
        res.json({ message: 'Notice deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Acknowledge/Like a notice (Any logged-in user can click this)
router.put('/:id/like', protect, async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        notice.likes += 1;
        await notice.save();
        res.json(notice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;