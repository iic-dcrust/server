const env = process.env.APP_ENV; // 'pro' || 'dev' || 'test'

const dev = {
	mode: "dev",
	clients: ["localhost:3000"],
	app: {
		port: 4433,
	},
	db: {
		host: "localhost",
	},
	useMongoDB: true,
	mongoDBLink: "mongodb://localhost:27017/DATABASE_NAME",
	timeZone: "Asia/Calcutta",
};

const config = {
	dev: { ...dev },
};

module.exports.config = config[env];
