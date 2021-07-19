const cors = require("cors");
const { config } = require("../config");
const routes = require("../routes/api");
const express = require("express");
const { sendMsgTo } = require("../utils");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

if (!process.env.APP_ENV) {
	console.error("Please Provide .env file at root the folder");
	process.exit();
}

var corsOptions = {
  origin: function (origin, callback) {
    if (config.clients.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:false
}


app.use(cors(corsOptions));
//For express sessions
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { httpOnly: false },
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Code simulate low network connection speed
//app.use((req, res, next) => {
//setTimeout(() => next(), 2000);
//});

// test if server run fine..
app.use("/", (req, res, next) => {
	console.log(`[${req.method}] ${req.originalUrl} --> `);
	if (config.logReqBody === true && !!req.body) {
		console.log(`Body :- ${JSON.stringify(req.body, undefined, 4)}`);
	}
	if (config.logReqParams === true) {
		console.log(`Query :- ${JSON.stringify(req.query, undefined, 4)}`);
	}
	next();
});
app.get("/isServerRunning", (req, res, next) => {
	res.status(200).send({ Run: true });
});
app.use("/api", routes.route);

if (config.mode !== "dev") {
	process.on("uncaughtException", (err) => {
		console.error(err);
		const msg = `**** An UncaughtException Error :- \n ${err.message}`;
		sendMsgTo(msg);
		console.log("server reload.....");
	});

	process.on("unhandledRejection", (err, promise) => {
		console.error(err);
		const msg = `**** An UnhandledRejection Error :- \n ${err.message}`;
		sendMsgTo(msg);
		console.log("server reload.....");
	});
}

module.exports = app;
