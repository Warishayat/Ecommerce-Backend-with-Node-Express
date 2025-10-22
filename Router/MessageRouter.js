const express = require("express");
const msg_router = express.Router();
const { sendMessage, getAllMessages } = require("../Controller/MessageContoller");
const authentication = require("../Middleware/Authentication");

msg_router.post("/send", sendMessage);
msg_router.get("/all", authentication, getAllMessages);

module.exports = msg_router;
