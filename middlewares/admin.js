let adminEmailList = ["iamtushar324@gmail.com"];

async function admin(req, res, next) {
	let found = false;
	adminEmailList.map((email) => {
		if (req.user.email === email) {
			found = true;
			next();
			return;
		}
	});

	if (!found) {
		res.sendStatus(401).send({ error: "You are not a admin" });
		return;
	} else {
		return;
	}
}

module.exports = { admin };
