const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST /api/student/student_details
router.post('/student_details', async (req, res) => {
  try {
    const { name, email, mobno, semester, section, rollNumber } = req.body;

    const student = new Student({
      name,
      email,
      mobno,
      semester,
      section,
      rollNumber,
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
