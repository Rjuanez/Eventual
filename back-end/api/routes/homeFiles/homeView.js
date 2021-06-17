const express = require('express');
const User = require('../../../models/user');
const homeView = express.Router();
var path = require('path');

homeView.use((req, res) => {
    res.sendFile(path.join(__dirname + "../../../../views/home.html"));
})


module.exports = homeView;