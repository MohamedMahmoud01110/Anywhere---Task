const express = require("express");
const router = express.Router();
const catchAsync = require("../middleware/CatchAsync");
const quizController = require("../controllers/quizController");
const validateQuizAndQuestions = require("../middleware/ValidateQuizAndQuestions");

router.post(
  "/",
  validateQuizAndQuestions,
  catchAsync(quizController.createQuiz),
);
router.get("/", catchAsync(quizController.getQuizzes));

router.put(
  "/:id",
  validateQuizAndQuestions,
  catchAsync(quizController.updateQuiz),
);
router.delete(
  "/:id",
  validateQuizAndQuestions,
  catchAsync(quizController.deleteQuiz),
);

router.post(
  "/:id/questions",
  validateQuizAndQuestions,
  catchAsync(quizController.addQuestions),
);
router.get("/:id", catchAsync(quizController.getQuestions));

router.get(
  "/:id/questions/:index",
  catchAsync(quizController.getQuestionByIndex),
);

router.put(
  "/:id/questions/:questionId",
  catchAsync(quizController.updateQuestion),
);

router.post(
  "/:id/questions/:questionId/submit",
  catchAsync(quizController.submitAnswer),
);
