const Course = require('../models/course');
const mongoose = require('mongoose');

// ── GET all courses ───────────────────────────────────────────
const getAll = async (req, res) => {
  try {
    const courses = await Course.find().sort({ courseCode: 1 });
    res.status(200).json({
      count: courses.length,
      courses
    });
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

// ── GET single course by ID ───────────────────────────────────
const getSingle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format. Please provide a valid MongoDB ObjectId.' });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: `No course found with ID: ${req.params.id}` });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

// ── POST create a new course ──────────────────────────────────
const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({
      message: 'Course created successfully',
      id: course._id,
      courseCode: course.courseCode,
      courseName: course.courseName
    });
  } catch (err) {
    console.error('Error creating course:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: 'Validation failed', details: messages });
    }
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        error: `Duplicate value: A course with this ${field} already exists.`,
        field,
        value: err.keyValue[field]
      });
    }
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

// ── PUT update a course ───────────────────────────────────────
const updateCourse = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format. Please provide a valid MongoDB ObjectId.' });
    }
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).json({ error: `No course found with ID: ${req.params.id}` });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error updating course:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: 'Validation failed', details: messages });
    }
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({
        error: `Duplicate value: A course with this ${field} already exists.`,
        field,
        value: err.keyValue[field]
      });
    }
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

// ── DELETE a course ───────────────────────────────────────────
const deleteCourse = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format. Please provide a valid MongoDB ObjectId.' });
    }
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: `No course found with ID: ${req.params.id}` });
    }
    res.status(200).json({
      message: 'Course deleted successfully',
      deletedCourse: {
        id: course._id,
        courseCode: course.courseCode,
        courseName: course.courseName
      }
    });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

module.exports = { getAll, getSingle, createCourse, updateCourse, deleteCourse };