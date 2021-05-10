const { sqlDB } = require("../../handlers/sqlDB");
const seq = require("sequelize");

const MAX_STRING_LENGTH = 50;

const Users = sqlDB.define("Users", {
	id: {
		type: seq.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	username: {
		type: seq.STRING(MAX_STRING_LENGTH),
		allowNull: false,
		unique: "username",
	},
	email: {
		type: seq.STRING(MAX_STRING_LENGTH),
		allowNull: false,
		unique: "email",
	},
	password: {
		type: seq.STRING(256),
		allowNull: false,
	},
	token: {
		type: seq.STRING(256),
		unique: "token",
	},
	role: {
		type: seq.STRING(20),
	},
	year: { type: seq.STRING(1) },
	rollNumber: {
		type: seq.STRING(12),
	},
	branch: {
		type: seq.STRING(20),
	},
	phone: {
		type: seq.STRING(14),
	},
	firstName: {
		type: seq.STRING(MAX_STRING_LENGTH),
	},
	lastName: {
		type: seq.STRING(MAX_STRING_LENGTH),
	},
	dob: {
		type: seq.STRING(10),
	},
	salt: {
		type: seq.STRING(50),
		allowNull: false,
	},
	registeredEvents: {
		type: seq.TEXT,
		get() {
			return this.getDataValue("registeredEvents").split(";");
		},
		set(val) {
			this.setDataValue("registeredEvents", val.join(";"));
		},

		defaultValue: " ",
	},
});

module.exports = { Users };
