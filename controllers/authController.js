// controllers/authController.js
// Handles login, logout, and profile retrieval

// ── Google OAuth callback is handled by Passport automatically ─
// These are the extra controller actions for auth routes.

// GET /auth/profile — returns the currently logged-in user
const getProfile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated. Please log in.' });
  }
  res.status(200).json({
    message: 'Authenticated',
    user: {
      id: req.user._id,
      displayName: req.user.displayName,
      email: req.user.email,
      profilePhoto: req.user.profilePhoto,
      role: req.user.role
    }
  });
};

// GET /auth/logout — destroys session
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed', details: err.message });
    }
    req.session.destroy(() => {
      res.status(200).json({ message: 'Logged out successfully.' });
    });
  });
};

module.exports = { getProfile, logout };