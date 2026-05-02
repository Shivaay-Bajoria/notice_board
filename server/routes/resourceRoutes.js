const express = require('express');
const Resource = require('../models/Resource');
const { protect, facultyOnly } = require('../middleware/auth');
const router = express.Router();

// Get all resources, sorted by newest first
router.get('/', protect, async (req, res) => {
    try {
        const resources = await Resource.find().sort({ createdAt: -1 });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new resource (Faculty only)
router.post('/', protect, facultyOnly, async (req, res) => {
    const { courseCode, title, link } = req.body;
    try {
        const newResource = new Resource({ 
            courseCode, title, link, uploadedBy: req.user.name 
        });
        await newResource.save();
        res.status(201).json(newResource);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a resource
router.delete('/:id', protect, facultyOnly, async (req, res) => {
    try {
        await Resource.findByIdAndDelete(req.params.id);
        res.json({ message: 'Resource deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;