const {
	getEventsSvc,
	getEventByIdSvc,
	createEventSvc,
} = require("../services/events-svc");

async function getEvents(req, res) {
	try {
		let { type, page, time } = req.query;
		page = page && parseInt(page - 1);
		await setTimeout(() => {}, 2000);
		let events = await getEventsSvc(page, type, time);
		res.status(200).send(events);
	} catch (err) {
		console.error(err);
		res.status(500).send({ error: err.message });
	}
}

async function getEventById(req, res) {
	try {
		let id = req.params.id;
		let event = await getEventByIdSvc(id);
		res.status(200).send(event);
	} catch (err) {
		console.error(err);
		res.status(500).send({ error: err.message });
	}
}

async function createEvent(req, res) {
	try {
		let data = req.body;
		const event = await createEventSvc(data);
		if (!event) {
			throw new Error("Unexpected Error");
		}

		res.status(200).send({ success: "Event Created", eventId: event });
	} catch (err) {
		console.error(err);
		res.status(500).send({ error: err.message });
	}
}

module.exports = { getEvents, getEventById, createEvent };
