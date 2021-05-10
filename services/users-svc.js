const { Users } = require("../models/schema/users");
const { randomStringGenrator } = require("../utils/randomStringGenrator");
const crypto = require("crypto");
const { Op } = require("sequelize");

async function CreateNewUser(data) {
	const token = randomStringGenrator(150);
	const salt = randomStringGenrator(50);

	if (await isEmailRegistered(data.email)) {
		let error = new Error("Email Already Registered");
		error.http_code = 400;
		throw error;
	}

	if (await isUsernameRegistered(data.username)) {
		let error = new Error("Username Already Registered");
		error.http_code = 400;
		throw error;
	}

	const hashedPassword = crypto
		.pbkdf2Sync(data.password, salt, 1000, 64, `sha512`)
		.toString(`hex`);
	data.password = hashedPassword;

	data.role = "student";

	console.log(data);
	const newUser = await Users.create({ ...data, token, salt });
	console.log(`New User Created with ID :- ${newUser.id}`);
	return newUser;
}

async function isUsernameRegistered(username) {
	const registerUser = await Users.findOne({
		attributes: ["id"],
		where: { username: username },
	});

	if (!registerUser) {
		return false;
	} else {
		return true;
	}
}
async function isEmailRegistered(email) {
	const registerUser = await Users.findOne({
		attributes: ["id"],
		where: { email: email },
	});

	if (!registerUser) {
		return false;
	} else {
		return true;
	}
}

async function authAndGetLoginToken({ username, email, password }) {
	if (!username) {
		username = "";
	}
	if (!email) {
		email = "";
	}
	const user = await Users.findOne({
		attributes: ["token", "firstName", "password", "salt"],
		where: {
			[Op.or]: [{ username: username }, { email: email }],
		},
	});
	if (!user) {
		let error = new Error("User not found");
		error.http_code = 400;
		throw error;
	}

	const hashedPassword = crypto
		.pbkdf2Sync(password, user.salt, 1000, 64, `sha512`)
		.toString(`hex`);

	if (hashedPassword === user.password) {
		return user;
	} else {
		let error = new Error("Password is Incorrect");
		error.http_code = 400;
		throw error;
	}
}

async function getUserFromToken(token) {
	const user = await Users.findOne({
		attributes: ["email", "username", "firstName"],
		where: {
			token: token,
		},
	});

	if (!user) {
		let error = new Error("Invalid Token");
		error.http_code = 400;
		throw error;
	}

	return user;
}

module.exports = {
	CreateNewUser,
	isUsernameRegistered,
	isEmailRegistered,
	authAndGetLoginToken,
	getUserFromToken,
};
