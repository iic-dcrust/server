const { Users } = require("../models/schema/users");
const { randomStringGenrator } = require("../utils/randomStringGenrator");

async function CreateNewUser(data) {
	try {
		const token = randomStringGenrator(150);
		const newUser = await Users.create({ ...data, token });
		console.log(`New User Created with ID :- ${newUser.id}`);
		return newUser;
	} catch (err) {
		console.error(err);
		return { error: err.message };
	}
}

module.exports = { CreateNewUser };
