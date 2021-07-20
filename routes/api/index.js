const route = require("express").Router();
const Users = require("./Users").route;
const Events = require("./events").route;

route.use("/users", Users);
route.use("/events", Events);

module.exports = { route };
