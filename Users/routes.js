import * as dao from "./dao.js";
export default function UserRoutes(app) {
	const createUser = async (req, res) => {
		const user = await dao.createUser(req.body);
		res.json(user);
	};
	const deleteUser = async (req, res) => {
		const status = await dao.deleteUser(req.params.userId);
		res.json(status);
	};
	const findAllUsers = async (req, res) => {
		const { role, name } = req.query;
		let users = [];
		if (name && role) {
			const roleUsers = await dao.findUsersByRole(role);
			const nameOnlyLetters = name.replace(/\\/g, '\\\\');
			const nameUsers = await dao.findUsersByPartialName(nameOnlyLetters);
			users = roleUsers.filter((u) => nameUsers.some((u2) => u2.loginId === u.loginId));
		}
		else if (role) {
			users = await dao.findUsersByRole(role);
		}
		else if (name) {
			const nameOnlyLetters = name.replace(/\\/g, '\\\\');
			users = await dao.findUsersByPartialName(nameOnlyLetters);
		}
		else {
			const users = await dao.findAllUsers();
			res.json(users);
			return;
		}
		res.json(users);
	};
	const findUserById = async (req, res) => {
		const user = await dao.findUserById(req.params.userId);
		res.json(user);
	};
	const updateUser = async (req, res) => {
		const { userId } = req.params;
		const status = await dao.updateUser(userId, req.body);
		res.json(status);
	};
	const signup = async (req, res) => {
		const user = await dao.findUserByUsername(req.body.username);
		if (user) {
			res.status(400).json(
				{ message: "Username already taken" });
			return;
		}
		const currentUser = await dao.createUser(req.body);
		req.session["currentUser"] = currentUser;
		res.json(currentUser);
	};
	const signin = async (req, res) => {
		const { username, password } = req.body;
		const currentUser = await dao.findUserByCredentials(username, password);
		if (currentUser) {
			req.session["currentUser"] = currentUser;
			res.json(currentUser);
		} else {
			res.status(401).json({ message: "Unable to login. Try again later." });
		}
	};
	const signout = (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	};
	const profile = async (req, res) => {
		const currentUser = req.session["currentUser"];
		if (!currentUser) {
			res.sendStatus(401);
			return;
		}
		res.json(currentUser);
	};
	app.post("/api/users", createUser);
	app.get("/api/users", findAllUsers);
	app.get("/api/users/:userId", findUserById);
	app.put("/api/users/:userId", updateUser);
	app.delete("/api/users/:userId", deleteUser);
	app.post("/api/users/signup", signup);
	app.post("/api/users/signin", signin);
	app.post("/api/users/signout", signout);
	app.post("/api/users/profile", profile);
}

