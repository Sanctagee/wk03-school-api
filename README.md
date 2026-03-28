# 🏫 GabbyTech Academy — School Management API

A RESTful API for managing students and courses at a Nigerian Secondary School (JSS1–SS3).
Built with Node.js, Express, Mongoose, and Google OAuth 2.0 authentication as part of **CSE 341: Web Services** at BYU-Idaho.

---

## 🔗 Project Links

| Resource | Link |
|---|---|
| GitHub Repo | `https://github.com/Sanctagee/wk03-school-api` |
| Live API (Render) | `https://gabbytech-academy-api.onrender.com/` |
| API Docs (Swagger) | `https://gabbytech-academy-api.onrender.com/api-docs` |
| Demo Video (YouTube) | `https://youtu.be/9LU_OqFC_Gs?si=jmkySPOBSr8qWOe8` |

> 📝 Replace the placeholder links above with your real URLs after deployment.

---

## 📦 Packages & Dependencies — Full Reference

This section documents every package used in this project, organized by when it was introduced.

---

### 🟦 Week 1 & 2 — Contacts Project (Foundation)

| Package | Install Command | What It Does |
|---|---|---|
| **express** | `npm install express` | The core web framework for Node.js. Handles all incoming HTTP requests, defines routes, and sends responses. |
| **dotenv** | `npm install dotenv` | Reads your `.env` file and loads its values into `process.env`. Keeps sensitive information like your MongoDB password out of your code and out of GitHub. |
| **cors** | `npm install cors` | Stands for Cross-Origin Resource Sharing. Allows your API to be called from different domains — from a browser, Swagger UI, or a frontend app hosted elsewhere. |
| **mongodb** | `npm install mongodb` | The raw, official MongoDB driver for Node.js. Used in Weeks 1–2 to connect directly to the database. Replaced by Mongoose in Week 3. |
| **swagger-ui-express** | `npm install swagger-ui-express` | Serves the interactive Swagger documentation page at `/api-docs`. Lets you and your grader test all API routes visually in the browser. |
| **swagger-autogen** | `npm install swagger-autogen` | Automatically generates the `swagger-output.json` file by scanning your route files. Run `node swagger.js` once to produce the JSON file. |

---

### 🟩 Week 3 — School Management API (Mongoose & Validation)

| Package | Install Command | What It Does |
|---|---|---|
| **mongoose** | `npm install mongoose` | An ODM (Object Document Mapper) for MongoDB. Lets you define schemas (blueprints) and models (collections). Handles data validation automatically. |
| **nodemon** *(dev only)* | `npm install --save-dev nodemon` | Watches your project files and automatically restarts the server whenever you save a change. Only used during development. |

**Week 3 install command:**
```bash
npm install express mongoose dotenv cors swagger-ui-express swagger-autogen
npm install --save-dev nodemon
```

---

### 🟥 Week 4 — Authentication (Google OAuth 2.0 & Sessions)

| Package | Install Command | What It Does |
|---|---|---|
| **passport** | `npm install passport` | The main authentication middleware for Node.js. Provides a standard framework that login strategies plug into. |
| **passport-google-oauth20** | `npm install passport-google-oauth20` | A Passport strategy specifically for Google login using OAuth 2.0. Handles the redirect to Google, receives the user's confirmed identity, and passes it to your app. |
| **express-session** | `npm install express-session` | Creates and manages user sessions — allows the server to remember that a user is logged in between requests. |
| **bcryptjs** | `npm install bcryptjs` | Hashes passwords securely before storing them in the database. Ensures no plain-text passwords are ever saved. |
| **connect-mongo** | `npm install connect-mongo` | Saves session data to MongoDB instead of server memory. Critical for cloud hosting like Render where server restarts would otherwise wipe all sessions. |

**Week 4 install command:**
```bash
npm install passport passport-google-oauth20 express-session bcryptjs connect-mongo
```

---

## 📁 Project Structure

```
wk03-school-api/
│
├── config/
│   └── passport.js            ← Google OAuth 2.0 strategy setup
│
├── controllers/
│   ├── authController.js      ← Profile and logout logic
│   ├── coursesController.js   ← Business logic for course routes
│   ├── dashboardController.js ← Summary and stats logic
│   └── studentsController.js  ← Business logic for student routes
│
├── middleware/
│   └── isAuthenticated.js     ← Protects private routes from unauthenticated access
│
├── models/
│   ├── course.js              ← Mongoose schema for courses (17+ fields)
│   ├── student.js             ← Mongoose schema for students (25+ fields)
│   └── user.js                ← Mongoose schema for OAuth users
│
├── routes/
│   ├── authRoute.js           ← /auth/google, /auth/logout, /auth/profile
│   ├── coursesRoute.js        ← /courses endpoints
│   ├── index.js               ← Main router (connects all sub-routes)
│   └── studentsRoute.js       ← /students endpoints
│
├── public/
│   ├── index.html             ← Landing page
│   └── styles/
│       └── style.css          ← Dark Navy + Gold stylesheet
│
├── .env                       ← Secret keys (never committed to GitHub)
├── .env.example               ← Template showing required env variables
├── .gitignore                 ← Tells Git to ignore node_modules and .env
├── package.json               ← Project metadata and dependency list
├── server.js                  ← Entry point — starts the Express server
├── swagger.js                 ← Run once to regenerate swagger-output.json
└── swagger-output.json        ← Auto-generated API documentation (committed)
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of your project with the following:

```env
MONGO_URL=mongodb+srv://tonygabito:myPassword@cluster0.xxxxx.mongodb.net/gabbytech_academy
SESSION_SECRET=some_long_random_string_here
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback
PORT=8000
NODE_ENV=development
```

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore` for this reason.
> Add all these same values as **Config Vars** in your Render dashboard for deployment.
> On Render, change `GOOGLE_CALLBACK_URL` to your live Render URL and set `NODE_ENV=production`.

---

## 🚀 Getting Started (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/YourUsername/wk03-school-api.git
cd wk03-school-api

# 2. Install all dependencies
npm install

# 3. Create your .env file (copy from .env.example and fill in your values)

# 4. Generate Swagger documentation
npm run swagger-autogen

# 5. Start development server (auto-restarts on file save)
npm run dev

# 6. Open in browser
# → Landing page:  http://localhost:8000
# → API Docs:      http://localhost:8000/api-docs
# → Google Login:  http://localhost:8000/auth/google
```

---

## 📜 NPM Scripts

| Script | Command | Purpose |
|---|---|---|
| `npm start` | `node server.js` | Start the server normally (used on Render) |
| `npm run dev` | `nodemon server.js` | Start with auto-restart (used during development) |
| `npm run swagger-autogen` | `node swagger.js` | Regenerate `swagger-output.json` after adding new routes |

---

## 🔐 Authentication Flow

This project uses Google OAuth 2.0 via Passport.js:

1. User visits `/auth/google` → redirected to Google's login page
2. User logs in with their Google account
3. Google redirects back to `/auth/google/callback` with a verified identity
4. Passport saves the user to MongoDB and creates a session
5. User is now authenticated — protected routes become accessible
6. User visits `/auth/logout` → session is destroyed, user is logged out

**Protected routes** (🔒 require login):
- `POST /students` — register a new student
- `PUT /students/:id` — update a student record
- `DELETE /students/:id` — delete a student
- `POST /courses` — create a new course
- `PUT /courses/:id` — update a course
- `DELETE /courses/:id` — delete a course

**Public routes** (no login required):
- `GET /students` — view all students
- `GET /students/:id` — view a single student
- `GET /students/grade/:grade` — filter students by grade
- `GET /courses` — view all courses
- `GET /courses/:id` — view a single course
- `GET /dashboard` — view school summary stats
- `GET /auth/profile` — view logged-in user profile
- `GET /auth/logout` — log out

---

## 📚 Collections (3 Total)

### 👨‍🎓 Students (25+ fields)
Stores secondary school student records including: `firstName`, `lastName`, `gender`, `dateOfBirth`, `nationality`, `stateOfOrigin`, `studentId`, `grade` (JSS1–SS3), `arm` (A–E), `email`, `address` (nested), `emergencyContact` (nested), `medical` (bloodGroup, genotype, allergies), `waecSubjects`, `cumulativeGPA`, `profilePhotoUrl`, and more.

### 📖 Courses (17+ fields)
Stores course/subject information including: `courseCode`, `courseName`, `department`, `subjectCategory` (Core/WAEC/NECO), `gradeLevel`, `term`, `teacherName`, `hoursPerWeek`, `maxEnrollment`, `creditUnits`, `passMark`, `isWAECSubject`, `description`, `syllabusSummary`, `textbooks`, and more.

### 👤 Users
Stores authenticated user profiles returned from Google OAuth including: `googleId`, `displayName`, `email`, `profilePhoto`, `role` (viewer/teacher/admin), `isActive`. Created automatically on first Google login.

---

## 🔗 All API Endpoints (16 Total)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/dashboard` | Public | School overview — totals, breakdowns, recent records |
| GET | `/students` | Public | Retrieve all registered students |
| GET | `/students/:id` | Public | Get a single student by MongoDB ID |
| GET | `/students/grade/:grade` | Public | Filter students by class (JSS1–SS3) |
| POST | `/students` | 🔒 Required | Register a new student with full validation |
| PUT | `/students/:id` | 🔒 Required | Update an existing student record |
| DELETE | `/students/:id` | 🔒 Required | Remove a student from the system |
| GET | `/courses` | Public | Retrieve all courses/subjects |
| GET | `/courses/:id` | Public | Get a single course by MongoDB ID |
| POST | `/courses` | 🔒 Required | Create a new course with full validation |
| PUT | `/courses/:id` | 🔒 Required | Update an existing course |
| DELETE | `/courses/:id` | 🔒 Required | Remove a course from the system |
| GET | `/auth/google` | Public | Initiate Google OAuth login |
| GET | `/auth/google/callback` | Public | Google OAuth callback (handled by Passport) |
| GET | `/auth/profile` | Public | View currently logged-in user profile |
| GET | `/auth/logout` | Public | Log out and destroy session |

---

## 🎓 Course Context

| Detail | Info |
|---|---|
| Course | CSE 341: Web Services — BYU-Idaho |
| Project | Project 2 (Weeks 3–4) |
| Week 3 Focus | CRUD operations, Mongoose validation, error handling, Swagger docs |
| Week 4 Focus | Google OAuth 2.0, session management, protected routes, bcrypt |

---

*Built by Gabriel Chikwendu Nwofoke — GabbyTech* 🚀