const express = require('express');
const Event = require('../../../models/event');
const User = require('../../../models/user')
const eventUpdate = express.Router({ mergeParams: true });
var path = require('path');
const jwtParser = require('../../../middlewares/jwtParser');
//const userId = require('./../userFiles/userLogInCheck');

eventUpdate.use(jwtParser);

eventUpdate.use(async(req, res) => {

    const { userId } = req;
    const found = await Event.findOne({ _id: req.params.id });
    const { creator } = found;
    console.log(userId);
    console.log(creator);
    if (found) {
        if (userId == creator) {
            await Event.updateOne({ _id: req.params.id }, { name: "NOMBRE CAMBIADO" });
            res.status(201).json({ message: "Event name has been changed" });
        } else {
            res.status(400).json({ message: "You don't have the enough privileges to update this event" });
        }
    } else {
        res.status(400).json({ message: "Event not found" });

    }

    //res.sendFile(path.join(__dirname + "../../../../views/eventJoined.html"));
})

module.exports = eventUpdate;