const mongoose = require("mongoose");

const OptionArray = {
  type: [String],
  validate: {
    validator: function (v) {
      return v.length === 4;
    },
    message: "Each question must have exactly 4 options.",
  },
};

const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: OptionArray,
    correctAns: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
      select: false,
    },
  },
  { _id: true },
);

const quizSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  course: { type: String, required: true },
  time: { type: Number, required: true }, // in minutes
  questions: { type: [QuestionSchema], default: [] },
  questionCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Quiz", quizSchema);
