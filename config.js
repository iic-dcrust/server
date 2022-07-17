require("dotenv").config();

const ENV = process.env.APP_ENV; // 'pro' || 'dev' || 'test'
const SQL_DB_PASSWORD = process.env.SQL_DB_PASSWORD;
const SQL_HOST = process.env.SQL_HOST;
const MONGO_HOST = process.env.MONGO_HOST;
const GOOGLE_CLIENT_TOKEN = process.env.GOOGLE_CLIENT_TOKEN;

const dev = {
	mode: "dev",
	clients: ["http://localhost:3000", "http://macbook.local:3000",],
	app: {
		port: 4433,
	},
	db: {
		host: SQL_HOST,
		dialect: "mariadb",
		database: "iic_db_dev",
		username: "root",
		password: SQL_DB_PASSWORD,
		logging: true,
	},
	useMongoDB: true,
	mongoDBLink: `mongodb://${MONGO_HOST}:27017/iic_dcrust`,
	timeZone: "Asia/Calcutta",
	logReqBody: true,
	logReqParams: true,
	googleClientToken: GOOGLE_CLIENT_TOKEN,
};
const pro = {
	mode: "pro",
	clients: [
		"http://localhost/",
		"http://localhost:3000",
		"http://macbook.local:3000",
		"http://macbook.local",
		"https://dev.iicdcrustm.com",
		"https://iicdcrustm.com",
		"http://iicdcrustm.com",
	],
	app: {
		port: 4133,
	},
	db: {
		host: SQL_HOST,
		dialect: "mysql",
		database: "iic_db_pro",
		username: "root",
		password: SQL_DB_PASSWORD,
		logging: false,
	},
	useMongoDB: false,
	mongoDBLink: `mongodb://${MONGO_HOST}:27017/iic_dcrust_pro`,
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
