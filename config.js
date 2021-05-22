require("dotenv").config();

const ENV = process.env.APP_ENV; // 'pro' || 'dev' || 'test'
const SQL_DB_DEV_PASSWORD = process.env.SQL_DB_DEV_PASSWORD;
const SQL_DB_PRO_PASSWORD = process.env.SQL_DB_PRO_PASSWORD;
const SQL_HOST = process.env.SQL_HOST;
const GOOGLE_CLIENT_TOKEN = process.env.GOOGLE_CLIENT_TOKEN;

const dev = {
	mode: "dev",
	clients: ["http://localhost:3000", "http://hackintosh.local:3000"],
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
	googleClientToken: GOOGLE_CLIENT_TOKEN,
};
const pro = {
	mode: "pro",
	clients: [
		"https://dev.iicdcrustm.com",
		"https://iicdcrustm.com",
		"http://localhost:3000",
	],
	app: {
		port: 4133,
	},
	db: {
		host: SQL_HOST,
		dialect: "mysql",
		database: "iic_db_pro",
		username: "iic_db_pro_user",
		password: SQL_DB_PRO_PASSWORD,
		logging: false,
	},
	useMongoDB: false,
	mongoDBLink: "mongodb://localhost:27017/iic_dcrust",
	timeZone: "Asia/Calcutta",
	logReqBody: false,
	logReqParams: false,
	googleClientToken: GOOGLE_CLIENT_TOKEN,
};

const config = {
	dev: { ...dev },
	pro: { ...pro },
};

module.exports.config = config[ENV];
