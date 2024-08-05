import db from "../Database/index.js";
export default function AssignmentRoutes(app) {
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = req.body;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        db.assignments[assignmentIndex] = { ...db.assignments[assignmentIndex], ...assignment};
        res.send(204);
    });
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        if(assignmentIndex === -1) {
            res.status(404).json({ message: `Unable to delete assignment with ID ${aid}` });
            return;
        }
        db.assignments.splice(assignmentIndex, 1);
        res.sendStatus(200);
    });
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = { ...req.body, course: cid, _id: new Date().getTime().toString()};
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.json(assignments);
    });
}