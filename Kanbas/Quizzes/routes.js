import * as dao from "./dao.js";
export default function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const { cid } = req.params;
        const quiz = await dao.createQuiz({...req.body, course: cid});
        res.json(quiz);
    };

    const findQuizzesByCourse = async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesByCourse(cid);
        res.json(quizzes);
    };

    const findQuizById = async (req, res) => {
        const { qid } = req.params;
        const quiz = await dao.findQuizById(qid);
        res.json(quiz);
    };

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const quiz = req.body;
        const status = await dao.updateQuiz(qid, quiz);
        res.json(status);
    };

    const deleteQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.deleteQuiz(qid);
        res.json(status);
    };

    app.put("/api/quizzes/:qid", updateQuiz);
    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.post("/api/courses/:cid/quizzes", createQuiz);
    app.get("/api/courses/:cid/quizzes", findQuizzesByCourse);
    app.get("/api/quizzes/:qid", findQuizById);
}