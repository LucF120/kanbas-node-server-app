import mongoose from "mongoose";
const quizQuestionSchema = new mongoose.Schema({
    title: String,
    question: String,
    points: Number,
    answerType: {
        type: String,
        enum: ["Multiple Choice", "True/False", "Fill In the Blank"],
        default: "Multiple Choice",
    },
    answerOptions: {
        type: [String],
        default: [],
    },
    correctAnswer: Number,
    correctWrittenAnswers: {
        type: [String],
        default: [],
    },
});
const quizSchema = new mongoose.Schema({
    name: { type: String, required: true },
    course: { type: String, required: true },
    description: String,
    questions: [quizQuestionSchema],
    availableDate: Date,
    untilDate: Date,
    dueDate: Date,
    published: Boolean,
    timeLimit: {
        type: Number,
        default: 20,
    },
    quizType: {
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",
    },
    assignmentGroup: {
        type: String,
        enum: ["Quizzes", "Exams", "Assignments", "Projects"],
        default: "Quizzes",
    },
    shuffleAnswers: {
        type: Boolean,
        default: true
    },
    multipleAttempts: {
        type: Boolean,
        default: false,
    },
    numAttempts: {
        type: Number,
        default: 1,
    },
    showCorrectAnswers: {
        type: Date,
        default: "",
    },
    accessCode: {
        type: String,
        default: "",
    },
    oneQuestionAtATime: {
        type: Boolean,
        default: true,
    },
    webcamRequired: {
        type: Boolean,
        default: false,
    },
    lockQuestionAfterAnswering: {
        type: Boolean,
        default: false,
    },

},
    { collection: "quizzes" }
);
export default quizSchema;
