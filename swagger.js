// swagger.js — regenerates swagger-output.json
// Run with: npm run swagger-autogen

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'GabbyTech Academy — School Management API',
    description: `
      A RESTful API for managing students and courses at GabbyTech Academy
      (Nigerian Secondary School System: JSS1–SS3).

      Built with Node.js, Express, Mongoose, and Google OAuth 2.0
      as part of CSE 341 Web Services at BYU-Idaho.

      ## Authentication
      Some routes require authentication. To test protected routes:
      1. Click the **Authorize** button above (or visit **/auth/google** in your browser)
      2. Log in with your Google account
      3. Return to Swagger UI and test the protected endpoints

      Protected routes are marked with 🔒

      Developed by GabbyTech.
    `,
    version: '2.0.0',
    contact: {
      name: 'GabbyTech',
      email: 'gabbytech101@gmail.com'
    }
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:8000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  securityDefinitions: {
    OAuth2: {
      type: 'oauth2',
      authorizationUrl: '/auth/google',
      flow: 'implicit',
      scopes: {
        'profile': 'Access your Google profile',
        'email': 'Access your Google email'
      },
      description: 'Login with Google OAuth 2.0. Click Authorize and follow the Google login flow.'
    }
  },
  tags: [
    { name: 'Auth', description: 'Google OAuth login, logout, and user profile' },
    { name: 'Dashboard', description: 'School summary statistics' },
    { name: 'Students', description: 'Student registration and management (write routes require login)' },
    { name: 'Courses', description: 'Course/subject management (write routes require login)' }
  ]
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
