const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const path = require("path");

const announcementsRoute = require("./routes/announcementRoutes");
const quizzesRoute = require("./routes/quizRoutes");

const app = express();

// body parser
app.use(express.json());

// security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

// logging (only dev)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// rate limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/announcements", announcementsRoute);
app.use("/api/quizzes", quizzesRoute);

module.exports = app;
