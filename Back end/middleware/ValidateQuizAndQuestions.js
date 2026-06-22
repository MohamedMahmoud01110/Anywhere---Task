module.exports = function validateQuizAndQuestions(req, res, next) {
  const { questions, question } = req.body;

  // validate a single question object
  const check = (q) => {
    // validate question text
    if (!q.question || typeof q.question !== "string")
      return "Question text (question) is required";

    // validate options array (must be 4 choices)
    if (!Array.isArray(q.options) || q.options.length !== 4)
      return "Options must be an array of 4 strings";

    // validate correct answer index
    if (
      typeof q.correctAns !== "number" ||
      q.correctAns < 0 ||
      q.correctAns > 3
    )
      return "correctAns must be an index 0-3";

    return null;
  };

  // validate multiple questions payload
  if (questions) {
    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "questions must be non-empty array" });
    }

    // validate each question
    for (const q of questions) {
      const error = check(q);
      if (error) return res.status(400).json({ message: error });
    }
  }

  // validate single question payload
  if (question) {
    const error = check(question);
    if (error) return res.status(400).json({ message: error });
  }

  // continue to controller
  next();
};
