const Quiz = require("../models/QuizModel");
const mongoose = require("mongoose");

exports.createQuiz = async (req, res) => {
  const quiz = await Quiz.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      quiz,
    },
  });
};

exports.getQuizzes = async (req, res) => {
  const { course: courseFilter, doctorName, page = 1, limit = 30 } = req.query;
  const query = {};
  if (courseFilter) query.course = courseFilter;
  if (doctorName) query.doctorName = doctorName;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await Quiz.countDocuments(query);
  const quizzes = await Quiz.find(query)
    .sort({ createdAt: -1 }) // sort by the show the latest at first
    .skip(skip)
    .limit(Number(limit));

  res.json({
    status: "success",
    stats: {
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    },
    data: {
      quizzes,
    },
  });
};

exports.updateQuiz = async (req, res) => {
  const updatableFields = new Set([
    "time",
    "course",
    "doctorName",
    "questions",
  ]);

  const cleanPayload = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => updatableFields.has(key)),
  );

  const quiz = await Quiz.findByIdAndUpdate(req.params.id, cleanPayload, {
    new: true,
    runValidators: true,
  });

  if (!quiz) return res.status(404).json({ message: "Not Found" });
  res.status(200).json({
    status: "success",
    message: "updated successfully",
    data: {
      quiz,
    },
  });
};

exports.deleteQuiz = async (req, res) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);
  if (!quiz) return res.status(404).json({ message: "Not Found" });
  res.status(204).json({
    status: "success",
    message: "deleted successfully",
  });
};

exports.addQuestions = async (req, res) => {
  const { questions } = req.body;
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  quiz.questions.push(...questions);
  await quiz.save();
  res.status(201).json({
    status: "success",
    data: {
      quiz,
    },
  });
};

exports.getQuestions = async (req, res) => {
  // pagination setup
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  let limit = Math.max(1, parseInt(req.query.limit || "1", 10));

  // max limit protection
  const MAX_LIMIT = 50;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  const skip = (page - 1) * limit;

  // validate id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid quiz ID" });
  }

  const objectId = new mongoose.Types.ObjectId(req.params.id);

  // aggregation query
  const aggregate = await Quiz.aggregate([
    { $match: { _id: objectId } },
    {
      $project: {
        doctorName: 1,
        course: 1,
        time: 1,

        // total questions count
        totalQuestions: { $size: { $ifNull: ["$questions", []] } },

        // paginated questions
        questions: {
          $map: {
            input: { $slice: ["$questions", skip, limit] },
            as: "q",
            in: {
              _id: "$$q._id",
              question: "$$q.question",
              options: "$$q.options",
            },
          },
        },
      },
    },
  ]);

  if (!aggregate || aggregate.length === 0)
    return res.status(404).json({ message: "Quiz not found" });

  const quiz = aggregate[0];

  const totalQuestions = quiz.totalQuestions || 0;
  const totalPages = Math.max(1, Math.ceil(totalQuestions / limit));

  // empty page fallback
  if (page > totalPages) {
    return res.status(200).json({
      status: "success",
      stats: {
        totalQuestions,
        page,
        totalPages,
      },
      data: {
        quizId: req.params.id,
        doctorName: quiz.doctorName,
        course: quiz.course,
        time: quiz.time,
        questions: [],
      },
    });
  }

  res.status(200).json({
    status: "success",
    stats: {
      totalQuestions,
      page,
      totalPages,
    },
    data: {
      quizId: req.params.id,
      doctorName: quiz.doctorName,
      course: quiz.course,
      time: quiz.time,
      questions: quiz.questions,
    },
  });
};

exports.updateQuestion = async (req, res) => {
  const { id, questionId } = req.params;
  const quiz = await Quiz.findById(id);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  const question = quiz.questions.id(questionId);
  if (!question) return res.status(404).json({ message: "Question not found" });

  if (req.body.question !== undefined) question.question = req.body.question;
  if (req.body.options !== undefined) question.options = req.body.options;
  if (req.body.correctAns !== undefined)
    question.correctAns = req.body.correctAns;
  await quiz.save();

  res.status(200).json({
    status: "success",
    message: "updated successfully",
    data: {
      question,
    },
  });
};

exports.getQuestionByIndex = async (req, res) => {
  const { id, index } = req.params;
  const idx = parseInt(index, 10);

  // validate index
  if (Number.isNaN(idx) || idx < 0)
    return res.status(400).json({ message: "Index must be a positive number" });

  // validate quiz id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid quiz ID" });

  const objectId = new mongoose.Types.ObjectId(id);

  // fetch quiz with specific question by index
  const aggregate = await Quiz.aggregate([
    { $match: { _id: objectId } },
    {
      $project: {
        doctorName: 1,
        course: 1,
        time: 1,

        // total number of questions
        totalQuestions: { $size: { $ifNull: ["$questions", []] } },

        // get single question by index
        question: {
          $let: {
            vars: {
              q: { $arrayElemAt: ["$questions", idx] },
            },
            in: {
              _id: "$$q._id",
              question: "$$q.question",
              options: "$$q.options",
            },
          },
        },
      },
    },
  ]);

  // quiz not found
  if (!aggregate || aggregate.length === 0)
    return res.status(404).json({ message: "Quiz not found" });

  const quiz = aggregate[0];

  // index out of range
  if (!quiz.question || quiz.question.question == null)
    return res.status(404).json({ message: "Question index out of range" });

  // response
  res.status(200).json({
    status: "success",
    stats: {
      totalQuestions: quiz.totalQuestions,
    },
    data: {
      quizId: id,
      doctorName: quiz.doctorName,
      course: quiz.course,
      question: quiz.question,
      index: idx,
      time: quiz.time,
    },
  });
};

exports.submitAnswer = async (req, res) => {
  const { id, questionId } = req.params;
  const answer = req.body?.answer;

  // validate ids
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(questionId)
  ) {
    return res.status(400).json({ message: "Invalid quiz or question id" });
  }

  // validate answer range
  if (typeof answer !== "number" || answer < 0 || answer > 3) {
    return res
      .status(400)
      .json({ message: "answer must be an index between 0 and 3" });
  }

  const quizObjectId = new mongoose.Types.ObjectId(id);
  const qObjectId = new mongoose.Types.ObjectId(questionId);

  // find question inside quiz
  const aggregate = await Quiz.aggregate([
    { $match: { _id: quizObjectId } },
    {
      $project: {
        question: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$questions",
                as: "q",
                cond: { $eq: ["$$q._id", qObjectId] },
              },
            },
            0,
          ],
        },
      },
    },
  ]);

  // not found case
  if (!aggregate || aggregate.length === 0 || !aggregate[0].question) {
    return res.status(404).json({ message: "Quiz or question not found" });
  }

  const question = aggregate[0].question;

  // compare answer with correct one
  const isCorrect = question.correctAns === answer;

  // return result
  return res.json({ correct: !!isCorrect });
};
