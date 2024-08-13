import * as dao from "./dao.js";
export default function EnrollmentRoutes(app) {
    const createEnrollment = async (req, res) => {
        const enrollment = await dao.createEnrollment(req.body);
        res.json(enrollment);
    };
    const deleteEnrollment = async (req, res) => {
        const status = await dao.deleteEnrollment(req.params.enrollmentId);
        res.json(status);
    };
    const findAllEnrollments = async (req, res) => {
        const enrollments = await dao.findAllEnrollments();
        res.json(enrollments);
    };
    const findEnrollmentById = async (req, res) => {
        const enrollment = await dao.findEnrollmentById(req.params.enrollmentId);
        res.json(enrollment);
    };
    const findEnrollmentsByUser = async (req, res) => {
        const { userId } = req.params;
        const enrollments = await dao.findEnrollmentsByUser(userId);
        res.json(enrollments);
    };
    const findEnrollmentsByCourse = async (req, res) => {
        const { courseId } = req.params;
        const enrollments = await dao.findEnrollmentsByCourse(courseId);
        res.json(enrollments);
    };

    const deleteEnrollmentsByCourse = async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteEnrollmentsByCourse(courseId);
        res.json(status);
    };
    
    app.get("/api/enrollments", findAllEnrollments);
    app.get("/api/enrollments/:enrollmentId", findEnrollmentById);
    app.get("/api/users/:userId/enrollments", findEnrollmentsByUser);
    app.get("/api/courses/:courseId/enrollments", findEnrollmentsByCourse);
    app.post("/api/enrollments", createEnrollment);
    app.delete("/api/enrollments/:enrollmentId", deleteEnrollment);
    app.delete("/api/courses/:courseId/enrollments", deleteEnrollmentsByCourse);
}

