const { getUserFromToken } = require("../services/users-svc");

async function auth(req, res, next) {
	console.log("auth");
	if (!req.session) {
		res.sendStatus(500).send({ error: "Internal error" });
		return;
	}
	const token = req.session.token;
	if (!token) {
		res.sendStatus(401).send({ error: "Not Loged In" });
		return;
	}
	const user = await getUserFromToken(token);
	if (!user) {
		res.sendStatus(401).send({ error: "Invalid Token" });
		return;
	} else {
		req.user = null;
		req.user = user;
		console.log(req.user);
		next();
	}
}

module.exports = { auth };
