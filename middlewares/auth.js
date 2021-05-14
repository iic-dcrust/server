const { getUserFromToken } = require("../services/users-svc");

async function auth(req, res, next) {
	if (!req.session) {
		res.status(500).send({ error: "Internal error" });
		console.log("Auth Rejected for (Internal Error) ");
		return;
	}
	const token = req.get("token");
	if (token === "null") {
		console.log("Auth Rejected for (Not Loged In) ->");
		res.status(401).send({ error: "Not Loged In" });
		return;
	}
	const user = await getUserFromToken(token);
	if (!user) {
		res.status(401).send({ error: "Invalid Token" });
		console.log("Auth Rejected for (Invalid ) ->");
		return;
	} else {
		req.user = null;
		req.user = user;
		console.log("Auth to  -> " + req.user.id);
		next();
	}
}

module.exports = { auth };
