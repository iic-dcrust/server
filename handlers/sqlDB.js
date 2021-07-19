const seq = require("sequelize");
const { config } = require("../config");

const sqlDB = new seq({
	...config.db,
});

module.exports = { sqlDB };
