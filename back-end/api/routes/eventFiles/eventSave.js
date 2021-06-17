const express = require('express');
const Event = require('../../../models/event');
const User = require('../../../models/user')
const eventSave = express.Router();
var path = require('path');
const jwtParser = require('../../../middlewares/jwtParser');
//const userId = require('./../userFiles/userLogInCheck');

eventSave.use(jwtParser);

eventSave.use(async(req, res) => {
    const { body:{ newEvent: { name, description, location, date, capacity, type }}   , userId } = req;
    console.groupCollapsed(req);
    if ((!req.body.newEvent.name) || (!req.body.newEvent.location) || (!req.body.newEvent.date) || (!req.body.newEvent.description) || (!req.body.newEvent.type)) {
        res.status(400).json({ message: "Please fill all the required fields" })
        
    }
    console.log(userId);
    const newEvent = new Event({ creator: userId, name, description, location, date, capacity, type });
    console.log(newEvent)
    if (newEvent) {
        await newEvent.save();
        await User.updateOne({ _id: userId }, { eventsCreated: newEvent._id });
        res.status(201).json({ message: "Event has been created succesfully" });
    } else {
        res.status(400).json({ message: "There's something wrong" })
    }
})

module.exports = eventSave;