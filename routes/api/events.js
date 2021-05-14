const route = require("express").Router();
const {
	getEvents,
	getEventById,
	createEvent,
	registerEvent,
} = require("../../controllers/events");
const { admin, auth } = require("../../middlewares");

//Routes

route.post("/create", auth, admin, createEvent);
route.get("/", getEvents);
route.get("/:id", getEventById);
route.post("/register/:id", auth, registerEvent);

// route.get("/", async (req, res) => {
// 	try {
// 		let { type, page, time } = req.query;
// 		page = page && parseInt(page - 1);
// 		let events = await getEventsController(page, type, time);
// 		res.status(200).send(events);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send({ error: err.message });
// 	}
// });

// route.get("/:id", async (req, res) => {
// 	try {
// 		let id = req.params.id;
// 		let event = await getEventById(id);
// 		res.send(200).send(event);
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).send({ error: err.message });
// 	}
// });

module.exports = { route };
