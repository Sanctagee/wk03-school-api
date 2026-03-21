const router = require('express').Router();
const { getDashboardSummary } = require('../controllers/dashboardController');

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

router.use('/students', require('./studentsRoute'));
router.use('/courses', require('./coursesRoute'));

module.exports = router;