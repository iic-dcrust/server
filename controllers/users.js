const {
	CreateNewUser,
	authAndGetLoginToken,
	isEmailRegistered,
	continueWithGoogleSvc,
} = require("../services/users-svc");
const validator = require("validator");
const { config } = require("../config.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(config.googleClientToken);

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
			token: newUser.token,
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
		const response = {
			success: "Succefully Loged In",
			firstName: loginToken.firstName,
			token: loginToken.token,
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

async function continueWithGoogle(req, res) {
	try {
		let idToken = req.body.idToken;
		console.log(idToken);
		let userData = await verify(idToken);
		console.log(userData);
		let user = await continueWithGoogleSvc(userData);
		let response = {
			success: "User Logged In",
			email: user.email,
			firstName: user.firstName,
			token: user.token,
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

async function verify(idToken) {
	const ticket = await client.verifyIdToken({
		idToken: idToken,
		audience: config.googleClientToken,
	});
	const payload = ticket.getPayload();

	let user = {
		email: payload.email,
		username: payload.email,
		firstName: payload.name,
		profilePic: payload.picture,
	};

	console.log(user);

	return user;
}

module.exports = { registerUser, loginUser, continueWithGoogle };
