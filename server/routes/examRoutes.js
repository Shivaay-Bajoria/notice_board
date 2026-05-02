const express = require('express');
const Exam = require('../models/Exam');
const { protect, facultyOnly } = require('../middleware/auth');
const router = express.Router();

// Get all exams, sorted by date (soonest first)
router.get('/', protect, async (req, res) => {
    try {
        const exams = await Exam.find().sort({ date: 1 });
        res.json(exams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new exam (Faculty only)
router.post('/', protect, facultyOnly, async (req, res) => {
    const { courseCode, title, date, type } = req.body;
    try {
        const newExam = new Exam({ 
            courseCode, title, date, type, createdBy: req.user.name 
        });
        await newExam.save();
        res.status(201).json(newExam);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an exam
router.delete('/:id', protect, facultyOnly, async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.params.id);
        res.json({ message: 'Exam deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;