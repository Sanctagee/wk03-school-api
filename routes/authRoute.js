// routes/authRoute.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getProfile, logout } = require('../controllers/authController');

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     tags: [Auth]
 *     description: >
 *       Redirects the user to Google's OAuth consent screen.
 *       After the user approves, Google redirects back to /auth/google/callback.
 *       **To test OAuth in Swagger UI:** Open this URL directly in your browser tab:
 *       `GET /auth/google`
 *     responses:
 *       302:
 *         description: Redirect to Google login page
 */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback URL
 *     tags: [Auth]
 *     description: >
 *       Google redirects here after the user grants access.
 *       This endpoint is handled automatically by Passport.
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Authorization code returned by Google
 *     responses:
 *       200:
 *         description: Authentication successful, session created
 *       401:
 *         description: Authentication failed
 */
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  function(req, res) {
    res.redirect('/auth/profile');
  }
);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current logged-in user profile
 *     tags: [Auth]
 *     security:
 *       - OAuth2: []
 *     description: >
 *       Returns the profile of the currently authenticated user.
 *       Requires an active session (log in via /auth/google first).
 *     responses:
 *       200:
 *         description: Returns authenticated user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authenticated
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     displayName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     profilePhoto:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Not authenticated
 */
router.get('/profile', getProfile);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out the current user
 *     tags: [Auth]
 *     security:
 *       - OAuth2: []
 *     description: Destroys the user session and logs them out.
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       500:
 *         description: Logout error
 */
router.get('/logout', logout);

/**
 * @swagger
 * /auth/failure:
 *   get:
 *     summary: OAuth login failure
 *     tags: [Auth]
 *     description: Returned when Google OAuth login fails.
 *     responses:
 *       401:
 *         description: Authentication failed
 */
router.get('/failure', function(req, res) {
  res.status(401).json({ error: 'Google OAuth authentication failed. Please try again.' });
});

module.exports = router;

