const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GabbyTech Academy — School Management API',
    description: `
      A RESTful API for managing students and courses at GabbyTech Academy 
      (Nigerian Secondary School System: JSS1–SS3).
      
      Built with Node.js, Express, and Mongoose as part of CSE 341 Web Services at BYU-Idaho.
      
      Developed by GabbyTech.
    `,
    version: '1.0.0',
    contact: {
      name: 'GabbyTech',
      email: 'gabbytech@example.com'
    }
  },
  host: 'localhost:8000',       // ← CHANGE to your Render URL after deploying e.g. your-app.onrender.com
  schemes: ['http'],            // ← CHANGE to ['https'] after deploying to Render
  tags: [
    { name: 'Dashboard', description: 'School summary statistics' },
    { name: 'Students', description: 'Student registration and management' },
    { name: 'Courses', description: 'Course/subject management' }
  ]
};

const outputFile = './swagger-output.json';
const routes = [
  './routes/index.js',
  './routes/studentsRoute.js',
  './routes/coursesRoute.js'
];

swaggerAutogen(outputFile, routes, doc);
