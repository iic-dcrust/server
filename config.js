require("dotenv").config();

const ENV = process.env.APP_ENV; // 'pro' || 'dev' || 'test'
const SQL_DB_DEV_PASSWORD = process.env.SQL_DB_DEV_PASSWORD;
const SQL_DB_PRO_PASSWORD = process.env.SQL_DB_PRO_PASSWORD;
const SQL_HOST = process.env.SQL_HOST;

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
const pro = {
  mode: "pro",
  clients: ["dev-iic.thinkbots.club", "iic.thinkbots.club", "http://localhost:3000"],
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
};

const config = {
  dev: { ...dev },
  pro: { ...pro },
};

module.exports.config = config[ENV];
