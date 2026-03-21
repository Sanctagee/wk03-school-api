const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    // ── Personal Information ──────────────────────────────────
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    middleName: {
      type: String,
      trim: true,
      maxlength: [50, 'Middle name cannot exceed 50 characters'],
      default: ''
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female'],
        message: '{VALUE} is not valid. Use Male or Female'
      }
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
      validate: {
        validator: function (dob) {
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          return age >= 9 && age <= 25;
        },
        message: 'Student age must be between 9 and 25 years'
      }
    },
    nationality: {
      type: String,
      required: [true, 'Nationality is required'],
      trim: true,
      default: 'Nigerian'
    },
    stateOfOrigin: {
      type: String,
      required: [true, 'State of origin is required'],
      trim: true
    },
    religion: {
      type: String,
      enum: {
        values: ['Christianity', 'Islam', 'Traditional', 'Other', 'Not specified'],
        message: '{VALUE} is not a valid religion option'
      },
      default: 'Not specified'
    },

    // ── Academic Information ──────────────────────────────────
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^GTA-\d{4}-\d{4}$/, 'Student ID must follow format: GTA-YYYY-XXXX (e.g. GTA-2024-0001)']
    },
    grade: {
      type: String,
      required: [true, 'Grade/Class is required'],
      enum: {
        values: ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'],
        message: '{VALUE} is not a valid grade. Use JSS1–JSS3 or SS1–SS3'
      }
    },
    arm: {
      type: String,
      required: [true, 'Class arm is required'],
      enum: {
        values: ['A', 'B', 'C', 'D', 'E'],
        message: '{VALUE} is not a valid arm. Use A–E'
      }
    },
    enrollmentDate: {
      type: Date,
      required: [true, 'Enrollment date is required'],
      default: Date.now
    },
    status: {
      type: String,
      required: [true, 'Student status is required'],
      enum: {
        values: ['Active', 'Graduated', 'Suspended', 'Withdrawn', 'Transferred'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Active'
    },
    cumulativeGPA: {
      type: Number,
      min: [0, 'GPA cannot be less than 0'],
      max: [5.0, 'GPA cannot exceed 5.0'],
      default: 0.0
    },
    waecSubjects: {
      type: [String],
      default: []
    },

    // ── Contact Information ───────────────────────────────────
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s\-]{7,15}$/, 'Please enter a valid phone number'],
      default: ''
    },
    address: {
      street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
      },
      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
      }
    },

    // ── Emergency Contact ─────────────────────────────────────
    emergencyContact: {
      fullName: {
        type: String,
        required: [true, 'Emergency contact name is required'],
        trim: true
      },
      relationship: {
        type: String,
        required: [true, 'Relationship to student is required'],
        enum: {
          values: ['Father', 'Mother', 'Guardian', 'Uncle', 'Aunt', 'Sibling', 'Other'],
          message: '{VALUE} is not a valid relationship'
        }
      },
      phoneNumber: {
        type: String,
        required: [true, 'Emergency contact phone number is required'],
        match: [/^\+?[\d\s\-]{7,15}$/, 'Please enter a valid phone number']
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        default: ''
      }
    },

    // ── Medical Information ───────────────────────────────────
    medical: {
      bloodGroup: {
        type: String,
        required: [true, 'Blood group is required'],
        enum: {
          values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
          message: '{VALUE} is not a valid blood group'
        }
      },
      genotype: {
        type: String,
        required: [true, 'Genotype is required'],
        enum: {
          values: ['AA', 'AS', 'AC', 'SS', 'SC', 'CC'],
          message: '{VALUE} is not a valid genotype'
        }
      },
      allergies: {
        type: [String],
        default: []
      },
      disabilities: {
        type: String,
        trim: true,
        default: 'None'
      },
      medicalNotes: {
        type: String,
        trim: true,
        maxlength: [500, 'Medical notes cannot exceed 500 characters'],
        default: ''
      }
    },

    // ── Profile ───────────────────────────────────────────────
    profilePhotoUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Profile photo must be a valid URL'],
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Virtual: full name
studentSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.middleName ? this.middleName + ' ' : ''}${this.lastName}`.trim();
});

// Virtual: age
studentSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const dob = new Date(this.dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
});

studentSchema.set('toJSON', { virtuals: true });
studentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Student', studentSchema);