const Student = require('../models/student');
const Course = require('../models/course');

// ── GET /dashboard ────────────────────────────────────────────
const getDashboardSummary = async (req, res) => {
  try {
    // Run all queries in parallel for performance
    const [
      totalStudents,
      totalCourses,
      activeStudents,
      waecCourses,
      studentsByGrade,
      coursesByDepartment,
      recentStudents,
      recentCourses
    ] = await Promise.all([
      Student.countDocuments(),
      Course.countDocuments(),
      Student.countDocuments({ status: 'Active' }),
      Course.countDocuments({ isWAECSubject: true }),
      Student.aggregate([
        { $group: { _id: '$grade', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Course.aggregate([
        { $group: { _id: '$department', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Student.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('firstName lastName studentId grade status createdAt'),
      Course.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('courseCode courseName department gradeLevel teacherName createdAt')
    ]);

    res.status(200).json({
      school: 'GabbyTech Academy',
      generatedAt: new Date().toISOString(),
      overview: {
        totalStudents,
        totalCourses,
        activeStudents,
        inactiveStudents: totalStudents - activeStudents,
        waecCourses,
        activeCourses: await Course.countDocuments({ isActive: true })
      },
      studentsByGrade: studentsByGrade.map((g) => ({ grade: g._id, count: g.count })),
      coursesByDepartment: coursesByDepartment.map((d) => ({ department: d._id, count: d.count })),
      recentStudents,
      recentCourses
    });
  } catch (err) {
    console.error('Error generating dashboard summary:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};

module.exports = { getDashboardSummary };