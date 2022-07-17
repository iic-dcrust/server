const {
	getEventsSvc,
	getEventByIdSvc,
	createEventSvc,
	registerUserForEventSvc,
	deleteEventSvc,
} = require("../services/events-svc");
const { getUserFromToken } = require("../services/users-svc");

async function getEvents(req, res) {
	try {
		let { type, page, time } = req.query;
		page = page && parseInt(page - 1);
		// await setTimeout(() => {}, 2000);
		let events = await getEventsSvc(page, type, time);
		res.status(200).send(events);
	} catch (err) {
		console.error(err);
		if (err.http_code === 400) {
			res.status(400).send({ error: err.message });
		} else {
			res.status(500).send({ error: "Internal Error" });
		}
	}
}

async function getEventById(req, res) {
	try {
		let id = req.params.id;
		let event = await getEventByIdSvc(id);

		let userToken = req.get("token");
		let user = null;
		if (userToken !== "null") {
			user = await getUserFromToken(userToken);
		}
		let eventRegistered = false;
		if (user) {
			eventRegistered = event?.registeredUsersId.includes(
				JSON.stringify(user.id)
			);
		}

		let response = {
			id: event.id,
			title: event.title,
			description: event.description,
			startTime: event.startTime,
			endTime: event.endTime,
			venue: event.venue,
			type: event.type,
			mainImgUrl: event.mainImgUrl,
			attachedFiles: event.attachedFiles,
			schedule: event.schedule,
			joinLink: event.joinLink,
			eventRegistered: eventRegistered,
		};

		res.status(200).send(response);
	} catch (err) {
		console.error(err);
		if (err.http_code === 400) {
			res.status(400).send({ error: err.message });
		} else {
			res.status(500).send({ error: "Internal Error" });
		}
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
		if (err.http_code === 400) {
			res.status(400).send({ error: err.message });
		} else {
			res.status(500).send({ error: "Internal Error" });
		}
	}
}

async function deleteEvent(req, res) {
	try {
		let id = req.params.id;
		const event = await deleteEventSvc(id);
		if (!event) {
			throw new Error("Unexpected Error");
		}

		res.status(200).send({ success: "Event Deleted", eventId: event.id });
	} catch (err) {
		console.error(err);
		if (err.http_code === 400) {
			res.status(400).send({ error: err.message });
		} else {
			res.status(500).send({ error: "Internal Error" });
		}
	}
}

async function registerEvent(req, res) {
	try {
		let userId = req.user.id;
		let eventId = req.params.id;
		const isRegistered = await registerUserForEventSvc(userId, eventId);
		if (!isRegistered) {
			throw new Error("Unexpected Error");
		}
		res.status(200).send({ success: "Registered" });
	} catch (err) {
		console.error(err);
		if (err.http_code === 400) {
			res.status(400).send({ error: err.message });
		} else {
			res.status(500).send({ error: "Internal Error" });
		}
	}
}

module.exports = { getEvents, getEventById, createEvent, registerEvent , deleteEvent};
