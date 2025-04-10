const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobno: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
