import db from "../Database/index.js";
export default function ModuleRoutes(app) {
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const module = req.body;
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        if(moduleIndex === -1) {
            res.status(404).json({ message: `Unable to delete module with ID ${mid}`});
            return;
        }
        db.modules[moduleIndex] = { ...db.modules[moduleIndex], ...module};
        res.send(204);
    });
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex((m) => m._id === mid);
        if(moduleIndex === -1) {
            res.status(404).json({ message: `Unable to delete module with ID ${mid}` });
            return;
        }
        db.modules.splice(moduleIndex, 1);
        res.sendStatus(200);
    });
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const newModule = { ...req.body, course: cid, _id: new Date().getTime().toString()};
        db.modules.push(newModule);
        res.send(newModule);
    });
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.filter((m) => m.course === cid);
        res.json(modules);
    });
}