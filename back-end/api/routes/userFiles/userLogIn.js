const express = require('express');
const User = require('../../../models/user');
const userLogIn = express.Router();
var path = require('path');

userLogIn.use((req, res) => {
    res.sendFile(path.join(__dirname + "../../../../views/login.html"));
})


module.exports = userLogIn;