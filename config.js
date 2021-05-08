require("dotenv").config();

const ENV = process.env.APP_ENV; // 'pro' || 'dev' || 'test'
const SQL_DB_DEV_PASSWORD = process.env.SQL_DB_DEV_PASSWORD;

const dev = {
	mode: "dev",
	clients: ["http://localhost:3000"],
	app: {
		port: 4433,
	},
	db: {
		host: "localhost",
		dialect: "mysql",
		database: "iic_db_dev",
		username: "iic_db_dev_user",
		password: SQL_DB_DEV_PASSWORD,
		logging: true,
	},
	useMongoDB: true,
	mongoDBLink: "mongodb://localhost:27017/iic_dcrust",
	timeZone: "Asia/Calcutta",
	logReqBody: true,
	logReqParams: true,
};

const config = {
	dev: { ...dev },
};

module.exports.config = config[ENV];
