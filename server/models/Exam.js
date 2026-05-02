const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ['Quiz', 'Midterm', 'Final', 'Practical'], default: 'Midterm' },
    createdBy: { type: String, required: true }
});

module.exports = mongoose.model('Exam', examSchema);