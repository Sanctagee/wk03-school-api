// routes/index.js
const router = require('express').Router();
const { getDashboardSummary } = require('../controllers/dashboardController');
const isAuthenticated = require('../middleware/isAuthenticated');

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get school dashboard summary
 *     tags: [Dashboard]
 *     description: Returns total students, courses, breakdowns by grade and department, and recent records.
 *     responses:
 *       200:
 *         description: Dashboard summary returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/dashboard', getDashboardSummary);

// ── Auth routes (login / logout / profile) ───────────────────
router.use('/auth', require('./authRoute'));

// ── Students routes ───────────────────────────────────────────
// GET routes are public; POST, PUT, DELETE require authentication
const studentsRouter = require('./studentsRoute');
router.use('/students', studentsRouter);

// ── Courses routes ────────────────────────────────────────────
// GET routes are public; POST, PUT, DELETE require authentication
const coursesRouter = require('./coursesRoute');
router.use('/courses', coursesRouter);

module.exports = router;
