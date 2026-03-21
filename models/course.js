const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    // ── Identification ────────────────────────────────────────
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z]{2,5}\d{3}$/, 'Course code must follow format: ABC123 (e.g. MTH301)']
    },
    courseName: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      minlength: [3, 'Course name must be at least 3 characters'],
      maxlength: [100, 'Course name cannot exceed 100 characters']
    },
    courseShortName: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: [10, 'Short name cannot exceed 10 characters'],
      default: ''
    },

    // ── Classification ────────────────────────────────────────
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: {
        values: ['Sciences', 'Arts', 'Commerce', 'Technical', 'Social Sciences', 'Languages', 'General Studies'],
        message: '{VALUE} is not a valid department'
      }
    },
    subjectCategory: {
      type: String,
      required: [true, 'Subject category is required'],
      enum: {
        values: ['Core', 'Elective', 'Compulsory', 'WAEC', 'NECO', 'Extra-Curricular'],
        message: '{VALUE} is not a valid subject category'
      }
    },
    gradeLevel: {
      type: String,
      required: [true, 'Grade level is required'],
      enum: {
        values: ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3', 'Junior (JSS1-3)', 'Senior (SS1-3)', 'All'],
        message: '{VALUE} is not a valid grade level'
      }
    },
    term: {
      type: String,
      required: [true, 'Term is required'],
      enum: {
        values: ['First Term', 'Second Term', 'Third Term', 'Full Year'],
        message: '{VALUE} is not a valid term'
      }
    },

    // ── Teacher & Schedule ────────────────────────────────────
    teacherName: {
      type: String,
      required: [true, 'Teacher name is required'],
      trim: true
    },
    teacherEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid teacher email'],
      default: ''
    },
    hoursPerWeek: {
      type: Number,
      required: [true, 'Hours per week is required'],
      min: [1, 'Must be at least 1 hour per week'],
      max: [20, 'Cannot exceed 20 hours per week']
    },
    maxEnrollment: {
      type: Number,
      required: [true, 'Maximum enrollment is required'],
      min: [1, 'Enrollment must be at least 1'],
      max: [200, 'Enrollment cannot exceed 200']
    },

    // ── Academic Details ──────────────────────────────────────
    creditUnits: {
      type: Number,
      required: [true, 'Credit units are required'],
      min: [1, 'Credit units must be at least 1'],
      max: [6, 'Credit units cannot exceed 6']
    },
    passMark: {
      type: Number,
      required: [true, 'Pass mark is required'],
      min: [0, 'Pass mark cannot be less than 0'],
      max: [100, 'Pass mark cannot exceed 100'],
      default: 40
    },
    isWAECSubject: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    syllabusSummary: {
      type: String,
      trim: true,
      maxlength: [2000, 'Syllabus summary cannot exceed 2000 characters'],
      default: ''
    },
    textbooks: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);