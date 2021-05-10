const route = require("express").Router();
const { registerUser, loginUser } = require("../../controllers/users");
const { auth } = require("../../middlewares");

route.post("/register", registerUser);

route.post("/login", loginUser);

route.get("/isLogedIn", auth, (req, res) => {
	res.send(true);
});

module.exports = { route };
