const {
	CreateNewUser,
	authAndGetLoginToken,
} = require("../services/users-svc");
const validator = require("validator");

async function registerUser(req, res) {
	try {
		const postData = req.body;

		// to-do
		postData.username = postData.email;

		//Req Validation
		if (!postData.email || !postData.password || !postData.phone) {
			throw new Error("Must Required :-  Email , Password , Phone");
		}
		if (!validator.isEmail(postData.email)) {
			let error = new Error("Please Provide a Valid Email Address");
			error.http_code = 400;
			throw error;
		}
		if (!validator.isEmail(postData.username)) {
			let error = new Error("Username should be same as email");
			error.http_code = 400;
			throw error;
		}
		if (!validator.isMobilePhone(postData.phone)) {
			let error = new Error("Phone number is not valid");
			error.http_code = 400;
			throw error;
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
		if (err.http_code === 400) {
			res.status(400).send({ error: err.message });
		} else {
			res.status(500).send({ error: "Internal Error" });
		}
	}
}

async function loginUser(req, res) {
	try {
		const postData = req.body;
		//Req Validation
		if (!postData.username && !postData.email) {
			throw new Error("Must Required :- Username or Email");
		}
		if (!postData.password) {
			throw new Error("Must Required :- Password");
		}
		// End Validator

		const loginToken = await authAndGetLoginToken(postData);

		req.session.token = loginToken.token;
		req.session.save();

		const response = {
			success: "Succefully Loged In",
			firstName: loginToken.firstName,
		};

		res.status(200).send(response);
	} catch (err) {
		console.error(err);
		if (err.http_code === 400) {
			res.status(400).send({ error: err.message });
		} else {
			res.status(500).send({ error: "Internal Error" });
		}
	}
}

module.exports = { registerUser, loginUser };
