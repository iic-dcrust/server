const route = require("express").Router();
const {
	registerUser,
	loginUser,
	continueWithGoogle,
} = require("../../controllers/users");
const { auth } = require("../../middlewares");

route.post("/register", registerUser);

route.post("/login", loginUser);

route.post("/google", continueWithGoogle);

route.get("/data", auth, (req, res) => {
	res.send(req.user);
});

module.exports = { route };
