const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    uploadedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);