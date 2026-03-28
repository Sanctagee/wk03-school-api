require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = process.env.PORT || 8000;

// ── Core Middleware ───────────────────────────────────────────
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.static('public'));

// ── Session ───────────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// ── Passport ──────────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());

// ── Swagger Docs ──────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ── Landing Page ──────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// ── API Routes ────────────────────────────────────────────────
app.use('/', require('./routes/index'));

// ── 404 Handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'An unexpected error occurred', details: err.message });
});

// ── Connect to MongoDB & Start Server ─────────────────────────
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB via Mongoose');
    const server = app.listen(port, () => {
      console.log(`🚀 GabbyTech Academy API running on port ${port}`);
      console.log(`📚 API Docs: http://localhost:${port}/api-docs`);
      console.log(`🔐 Login:    http://localhost:${port}/auth/google`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use. Run: npx kill-port ${port}`);
        process.exit(1);
      }
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });