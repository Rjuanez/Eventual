const express = require('express');
const User = require('../../../models/user');
const userShowView = express.Router();
var path = require('path');


userShowView.use((req, res) => {
    res.sendFile(path.join(__dirname + "../../../../views/register.html"));
})

module.exports = userShowView;