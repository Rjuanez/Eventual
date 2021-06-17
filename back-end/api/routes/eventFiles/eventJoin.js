const express = require('express');
const Event = require('../../../models/event');
const User = require('../../../models/user')
const eventJoin = express.Router({ mergeParams: true });
var path = require('path');
const jwtParser = require('../../../middlewares/jwtParser');
//const userId = require('./../userFiles/userLogInCheck');

eventJoin.use(jwtParser);

eventJoin.use(async(req, res) => {
    //console.log(req.params.id);

    const { userId } = req;

    const found = await Event.findOne({ _id: req.params.id });

    //console.log(found);
    const { creator } = found;

    const joined = await Event.findOne({ participants: userId });

    console.log(userId);
    if ((userId != creator) && (!joined)) {
        await Event.updateOne({ _id: req.params.id }, { participants: [userId] });
        res.status(200).json({ message: "Te has apuntado al evento correctamente" })
    } else if ((userId == creator) || (joined)) {
        res.status(400).json({ message: "Ya estas apuntado al evento" })
    } else if ((!req.params.id) && (!found)) {
        res.status(404).json({ message: "Evento no encontrado" })

    }


    //res.sendFile(path.join(__dirname + "../../../../views/eventJoined.html"));
})

module.exports = eventJoin;