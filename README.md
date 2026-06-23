# Anywhere Task

A full-stack educational platform for managing quizzes and course announcements. Instructors can create timed quizzes with multiple-choice questions, post announcements, and students can browse dashboards, view tasks, and take exams through a modern web interface.

## Features

- **Quiz management** — Create, update, and delete quizzes with course metadata, time limits, and multiple-choice questions (4 options each)
- **Question handling** — Add, fetch, update, and submit answers for individual questions
- **Announcements** — CRUD API for course announcements with doctor name, course, message, and read status
- **Student dashboard** — Hero section, announcements feed, and task list with sidebar navigation
- **Security** — Helmet headers, CORS, and rate limiting on API routes

## Tech Stack

| Layer    | Technologies |
| -------- | ------------ |
| Frontend | React 19, TypeScript, Vite, Material UI, Redux Toolkit, React Router, Axios |
| Backend  | Node.js, Express 5, Mongoose, MongoDB |
| Tooling  | ESLint, Nodemon |

## Project Structure

```
Anywhere---Task/
├── Back end/
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Validation, async error handling
│   ├── models/            # Mongoose schemas (Quiz, Announcement)
│   ├── routes/            # API route definitions
│   ├── app.js             # Express app configuration
│   └── server.js          # Server entry point & DB connection
├── Front end/
│   ├── src/
│   │   ├── api/           # Axios client & API helpers
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Redux slices
│   │   ├── layouts/       # App layout wrappers
│   │   └── pages/         # Route pages
│   └── vite.config.ts
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Anywhere---Task
```

### 2. Backend setup

```bash
cd "Back end"
npm install
```

Create a `.env` file in the `Back end` directory:

```env
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://<username>:<PASSWORD>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
DATABASE_PASSWORD=your_database_password
FRONTEND_URL=http://localhost:5173
```

> **Note:** The connection string uses `<PASSWORD>` as a placeholder that gets replaced at runtime with `DATABASE_PASSWORD`.

Start the API server:

```bash
npm start
```

The server runs on `http://localhost:3000` by default.

### 3. Frontend setup

In a separate terminal:

```bash
cd "Front end"
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

Update the API base URL in `Front end/src/api/Axios.tsx` if your backend is hosted elsewhere:

```ts
const API = axios.create({
  baseURL: "http://localhost:3000/api",
});
```

## Available Scripts

### Backend (`Back end/`)

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm start`      | Start dev server with Nodemon        |
| `npm run start:prod` | Start with `NODE_ENV=production` |

### Frontend (`Front end/`)

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start Vite dev server          |
| `npm run build` | Type-check and build for prod  |
| `npm run preview` | Preview production build     |
| `npm run lint`  | Run ESLint                     |

## API Reference

Base URL: `http://localhost:3000/api`

All routes are rate-limited to 100 requests per hour per IP.

### Announcements

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| POST   | `/announcements`          | Create an announcement   |
| GET    | `/announcements`          | List all announcements   |
| GET    | `/announcements/:id`      | Get announcement by ID   |
| PUT    | `/announcements/:id`      | Update an announcement   |
| DELETE | `/announcements/:id`      | Delete an announcement   |

### Quizzes

| Method | Endpoint                              | Description                    |
| ------ | ------------------------------------- | ------------------------------ |
| POST   | `/quizzes`                            | Create a quiz                  |
| GET    | `/quizzes`                            | List quizzes (supports `course`, `doctorName`, `page`, `limit` query params) |
| GET    | `/quizzes/:id`                        | Get quiz questions             |
| PUT    | `/quizzes/:id`                        | Update a quiz                  |
| DELETE | `/quizzes/:id`                        | Delete a quiz                  |
| POST   | `/quizzes/:id/questions`              | Add questions to a quiz        |
| GET    | `/quizzes/:id/questions/:index`       | Get question by index          |
| PUT    | `/quizzes/:id/questions/:questionId`  | Update a question              |
| POST   | `/quizzes/:id/questions/:questionId/submit` | Submit an answer         |

### Example: Create a quiz

```json
POST /api/quizzes
{
  "doctorName": "Dr. Smith",
  "course": "Computer Science 101",
  "time": 30,
  "questions": [
    {
      "question": "What does CPU stand for?",
      "options": ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"],
      "correctAns": 0
    }
  ]
}
```

## Frontend Routes

| Path            | Page            |
| --------------- | --------------- |
| `/`             | Home            |
| `/dashboard`    | Dashboard       |
| `/courses`      | Courses         |
| `/gradebook`    | Gradebook       |
| `/performance`  | Performance     |
| `/schedule`     | Schedule        |
| `/announcement` | Announcements   |

## Environment Variables

| Variable            | Description                                      |
| ------------------- | ------------------------------------------------ |
| `NODE_ENV`          | `development` or `production`                    |
| `PORT`              | Backend server port (default: `3000`)            |
| `DATABASE`          | MongoDB connection string with `<PASSWORD>` placeholder |
| `DATABASE_PASSWORD` | Password substituted into the connection string  |
| `FRONTEND_URL`      | Allowed CORS origin for the frontend             |

## License

This project is for educational purposes.
