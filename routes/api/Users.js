const route = require("express").Router();
const validator = require("validator");
const { CreateNewUser } = require("../../services/users-svc");

route.post("/register", async (req, res) => {
	try {
		const postData = req.body;

		//Req Validation
		if (!postData.username || !postData.email || !postData.password) {
			throw new Error("Must Required :- Username , Email , Password");
		}
		if (!validator.isEmail(postData.email)) {
			throw new Error("Please Provide a Valid Email Address");
		}
		if (!validator.isAlphanumeric(postData.username)) {
			throw new Error("Username Should be Alphanumeric");
		}
		// End Validator

		const newUser = await CreateNewUser(postData);

		if (newUser.error) {
			throw new Error(newUser.error);
		}

		const response = {
			success: "Succefully Registered",
			email: newUser.email,
		};

		res.status(200).send(response);
	} catch (err) {
		console.error(err);
		res.status(500).send({ error: err.message });
	}
});

module.exports = { route };
