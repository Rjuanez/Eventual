const express = require('express');
const Event = require('../../../models/event');
const eventCreate = express.Router();
var path = require('path');
const jwtParser = require('./../../../middlewares/jwtParser');

eventCreate.use(jwtParser);

eventCreate.use((req, res) => {
    //res.sendFile(path.join(__dirname + "../../../../views/createEvent.html"));

})

module.exports = eventCreate;