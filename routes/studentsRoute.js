const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of all registered students
 *       500:
 *         description: Internal server error
 */
router.get('/', studentsController.getAll);

/**
 * @swagger
 * /students/grade/{grade}:
 *   get:
 *     summary: Get students by grade
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: grade
 *         required: true
 *         schema:
 *           type: string
 *           enum: [JSS1, JSS2, JSS3, SS1, SS2, SS3]
 *         description: The class grade to filter by
 *     responses:
 *       200:
 *         description: Students in the specified grade
 *       400:
 *         description: Invalid grade value
 *       500:
 *         description: Internal server error
 */
router.get('/grade/:grade', studentsController.getByGrade);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a single student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB student ID
 *     responses:
 *       200:
 *         description: A single student record
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', studentsController.getSingle);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Register a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - gender
 *               - dateOfBirth
 *               - nationality
 *               - stateOfOrigin
 *               - studentId
 *               - grade
 *               - arm
 *               - email
 *               - address
 *               - emergencyContact
 *               - medical
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Chukwuemeka
 *               lastName:
 *                 type: string
 *                 example: Okafor
 *               middleName:
 *                 type: string
 *                 example: David
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *                 example: Male
 *               dateOfBirth:
 *                 type: string
 *                 example: "2008-03-14"
 *               nationality:
 *                 type: string
 *                 example: Nigerian
 *               stateOfOrigin:
 *                 type: string
 *                 example: Anambra
 *               religion:
 *                 type: string
 *                 enum: [Christianity, Islam, Traditional, Other, Not specified]
 *                 example: Christianity
 *               studentId:
 *                 type: string
 *                 example: GTA-2024-0001
 *               grade:
 *                 type: string
 *                 enum: [JSS1, JSS2, JSS3, SS1, SS2, SS3]
 *                 example: SS2
 *               arm:
 *                 type: string
 *                 enum: [A, B, C, D, E]
 *                 example: A
 *               enrollmentDate:
 *                 type: string
 *                 example: "2022-09-05"
 *               status:
 *                 type: string
 *                 enum: [Active, Graduated, Suspended, Withdrawn, Transferred]
 *                 example: Active
 *               cumulativeGPA:
 *                 type: number
 *                 example: 4.2
 *               waecSubjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Mathematics", "English Language", "Physics"]
 *               email:
 *                 type: string
 *                 example: emeka.okafor@gabbytech.edu.ng
 *               phoneNumber:
 *                 type: string
 *                 example: "+2348012345678"
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: 12 Adeola Odeku Street
 *                   city:
 *                     type: string
 *                     example: Lagos
 *                   state:
 *                     type: string
 *                     example: Lagos
 *               emergencyContact:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: Ngozi Okafor
 *                   relationship:
 *                     type: string
 *                     enum: [Father, Mother, Guardian, Uncle, Aunt, Sibling, Other]
 *                     example: Mother
 *                   phoneNumber:
 *                     type: string
 *                     example: "+2348098765432"
 *                   email:
 *                     type: string
 *                     example: ngozi.okafor@gmail.com
 *               medical:
 *                 type: object
 *                 properties:
 *                   bloodGroup:
 *                     type: string
 *                     enum: [A+, A-, B+, B-, AB+, AB-, O+, O-]
 *                     example: "O+"
 *                   genotype:
 *                     type: string
 *                     enum: [AA, AS, AC, SS, SC, CC]
 *                     example: AS
 *                   allergies:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Penicillin"]
 *                   disabilities:
 *                     type: string
 *                     example: None
 *                   medicalNotes:
 *                     type: string
 *                     example: Mild asthma
 *               profilePhotoUrl:
 *                 type: string
 *                 example: "https://example.com/photos/emeka.jpg"
 *     responses:
 *       201:
 *         description: Student registered successfully
 *       400:
 *         description: Validation failed or duplicate student ID/email
 *       500:
 *         description: Internal server error
 */
router.post('/', studentsController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update an existing student record
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: string
 *                 enum: [JSS1, JSS2, JSS3, SS1, SS2, SS3]
 *                 example: SS3
 *               status:
 *                 type: string
 *                 enum: [Active, Graduated, Suspended, Withdrawn, Transferred]
 *                 example: Active
 *               cumulativeGPA:
 *                 type: number
 *                 example: 4.5
 *               arm:
 *                 type: string
 *                 enum: [A, B, C, D, E]
 *                 example: B
 *     responses:
 *       204:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid ID format or validation failed
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', studentsController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student record
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The MongoDB student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', studentsController.deleteStudent);

module.exports = router;