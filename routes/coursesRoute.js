// routes/coursesRoute.js
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const isAuthenticated = require('../middleware/isAuthenticated');

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of all courses
 *       500:
 *         description: Internal server error
 */
router.get('/', coursesController.getAll);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a single course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB course ID
 *     responses:
 *       200:
 *         description: A single course record
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', coursesController.getSingle);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course (🔒 Requires login)
 *     tags: [Courses]
 *     security:
 *       - OAuth2: []
 *     description: >
 *       **Protected route.** You must be logged in via Google OAuth.
 *       Log in at [/auth/google](/auth/google) first, then return here to test.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseCode
 *               - courseName
 *               - department
 *               - subjectCategory
 *               - gradeLevel
 *               - term
 *               - teacherName
 *               - hoursPerWeek
 *               - maxEnrollment
 *               - creditUnits
 *               - description
 *             properties:
 *               courseCode:
 *                 type: string
 *                 example: MTH301
 *               courseName:
 *                 type: string
 *                 example: Further Mathematics
 *               courseShortName:
 *                 type: string
 *                 example: FURTHMATHS
 *               department:
 *                 type: string
 *                 enum: [Sciences, Arts, Commerce, Technical, Social Sciences, Languages, General Studies]
 *                 example: Sciences
 *               subjectCategory:
 *                 type: string
 *                 enum: [Core, Elective, Compulsory, WAEC, NECO, Extra-Curricular]
 *                 example: WAEC
 *               gradeLevel:
 *                 type: string
 *                 enum: [JSS1, JSS2, JSS3, SS1, SS2, SS3, "Junior (JSS1-3)", "Senior (SS1-3)", All]
 *                 example: SS3
 *               term:
 *                 type: string
 *                 enum: [First Term, Second Term, Third Term, Full Year]
 *                 example: Full Year
 *               teacherName:
 *                 type: string
 *                 example: Mr. Adewale Ogundimu
 *               teacherEmail:
 *                 type: string
 *                 example: a.ogundimu@gabbytech.edu.ng
 *               hoursPerWeek:
 *                 type: number
 *                 example: 5
 *               maxEnrollment:
 *                 type: number
 *                 example: 40
 *               creditUnits:
 *                 type: number
 *                 example: 4
 *               passMark:
 *                 type: number
 *                 example: 40
 *               isWAECSubject:
 *                 type: boolean
 *                 example: true
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               description:
 *                 type: string
 *                 example: Advanced mathematics for SS3 science students preparing for WAEC.
 *               syllabusSummary:
 *                 type: string
 *                 example: Term 1 Calculus. Term 2 Vectors. Term 3 Statistics.
 *               textbooks:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["New Further Mathematics by Tuttuh Adegun"]
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Validation failed or duplicate course code
 *       401:
 *         description: Unauthorized - login required
 *       500:
 *         description: Internal server error
 */
router.post('/', isAuthenticated, coursesController.createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update an existing course (🔒 Requires login)
 *     tags: [Courses]
 *     security:
 *       - OAuth2: []
 *     description: >
 *       **Protected route.** You must be logged in via Google OAuth.
 *       Log in at [/auth/google](/auth/google) first, then return here to test.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherName:
 *                 type: string
 *                 example: Dr. Emeka Eze
 *               hoursPerWeek:
 *                 type: number
 *                 example: 6
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               description:
 *                 type: string
 *                 example: Updated course description.
 *     responses:
 *       204:
 *         description: Course updated successfully
 *       400:
 *         description: Invalid ID format or validation failed
 *       401:
 *         description: Unauthorized - login required
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', isAuthenticated, coursesController.updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course (🔒 Requires login)
 *     tags: [Courses]
 *     security:
 *       - OAuth2: []
 *     description: >
 *       **Protected route.** You must be logged in via Google OAuth.
 *       Log in at [/auth/google](/auth/google) first, then return here to test.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Unauthorized - login required
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', isAuthenticated, coursesController.deleteCourse);

module.exports = router;
