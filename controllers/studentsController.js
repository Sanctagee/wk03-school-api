const Student = require('../models/student');
const mongoose = require('mongoose');

// ── GET all students ──────────────────────────────────────────
const getAll = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: students.length,
      students
    });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

// ── GET single student by ID ──────────────────────────────────
const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format. Please provide a valid MongoDB ObjectId.' });
    }
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: `No student found with ID: ${req.params.id}` });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

// ── GET students by grade ─────────────────────────────────────
const getByGrade = async (req, res) => {
  try {
    const validGrades = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'];
    const grade = req.params.grade.toUpperCase();
    if (!validGrades.includes(grade)) {
      return res.status(400).json({
        error: `Invalid grade: "${grade}". Valid grades are: ${validGrades.join(', ')}`
      });
    }
    const students = await Student.find({ grade }).sort({ lastName: 1 });
    res.status(200).json({
      grade,
      count: students.length,
      students
    });
  } catch (err) {
    console.error('Error fetching students by grade:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

// ── POST create a new student ─────────────────────────────────
const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({
      message: 'Student registered successfully',
      id: student._id,
      studentId: student.studentId,
      fullName: student.fullName
    });
  } catch (err) {
    console.error('Error creating student:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: 'Validation failed', details: messages });
    }
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        error: `Duplicate value: A student with this ${field} already exists.`,
        field,
        value: err.keyValue[field]
      });
    }
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

// ── PUT update a student ──────────────────────────────────────
const updateStudent = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format. Please provide a valid MongoDB ObjectId.' });
    }
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ error: `No student found with ID: ${req.params.id}` });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error updating student:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: 'Validation failed', details: messages });
    }
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        error: `Duplicate value: A student with this ${field} already exists.`,
        field,
        value: err.keyValue[field]
      });
    }
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

// ── DELETE a student ──────────────────────────────────────────
const deleteStudent = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format. Please provide a valid MongoDB ObjectId.' });
    }
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: `No student found with ID: ${req.params.id}` });
    }
    res.status(200).json({
      message: 'Student record deleted successfully',
      deletedStudent: {
        id: student._id,
        studentId: student.studentId,
        fullName: student.fullName
      }
    });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

module.exports = { getAll, getSingle, getByGrade, createStudent, updateStudent, deleteStudent };