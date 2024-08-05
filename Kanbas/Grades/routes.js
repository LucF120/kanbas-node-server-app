import Database from "../Database/index.js";
export default function GradeRoutes(app) {
    app.get("/api/grades", (req, res) => {
        res.send({
            grades: Database.grades,
            users: Database.users,
            enrollments: Database.enrollments,
            assignments: Database.assignments,
        });
    });
}