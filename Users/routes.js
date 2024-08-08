import * as dao from "./dao.js";
let currentUser = null;
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
	const signup = async (req, res) => { };
	const signin = async (req, res) => { };
	const signout = (req, res) => { };
	const profile = async (req, res) => { };
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

