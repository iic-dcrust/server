const { sqlDB } = require("../../handlers/sqlDB");
const seq = require("sequelize");

const Events = sqlDB.define("Events", {
	id: {
		type: seq.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	title: {
		type: seq.STRING(100),
	},
	description: {
		type: seq.TEXT,
	},
	startTime: {
		type: seq.DATE,
	},
	endTime: {
		type: seq.DATE,
	},
	venue: {
		type: seq.STRING(150),
	},
	type: {
		type: seq.STRING(20), // 'hack' || webinar || workshop
	},
	mainImgUrl: {
		type: seq.STRING(200),
	},
	registeredUsersId: {
		type: seq.TEXT,
		defaultValue: " ",
		get() {
			return this.getDataValue("registeredUsersId").split(";");
		},
		set(val) {
			this.setDataValue("registeredUsersId", val.join(";"));
		},

		
	},
	attachedFiles: {
		type: seq.TEXT,
	},
	schedule: {
		type: seq.TEXT,
	},
	joinLink: {
		type: seq.TEXT,
	},
});

module.exports = { Events };
