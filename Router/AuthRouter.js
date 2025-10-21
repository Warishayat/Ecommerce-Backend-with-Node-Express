const { Signup,Login } = require("../Controller/AuthRouter");
const express = require('express');
const { Signup_validation, Login_Validation } = require("../Middleware/Validate");
const auth_router = express.Router()


auth_router.post("/signup",Signup_validation,Signup)
auth_router.post("/login",Login_Validation,Login)

module.exports = auth_router