const express = require('express');
const bcrypt = require('bcrypt');
const Event = require('../../../models/event');
const User = require('../../../models/user');
const userDelete = express.Router();

var path = require('path');
const jwtParser = require('../../../middlewares/jwtParser');
//const userId = require('./../userFiles/userLogInCheck');

userDelete.use(jwtParser);

userDelete.use(async(req, res) => {
    const { userId } = req;
    let body = req.body;

    console.log(userId);
    const found = await User.findOne({ _id: userId });
    console.log(found._id);
    //const { creator } = found;
    const validPassword = await bcrypt.compare(body.password, found.password);
    if (validPassword) {
        if (userId == found._id) {
            await User.deleteOne({ _id: userId });
            await Event.deleteMany({ creator: userId });
            res.status(200).json({ message: `The user with ID: ${userId} and all his events have been deleted.` });
            //anadir borrado de la imagen en la carpeta
        }

    } else {
        res.status(400).json({ message: "Wrong password" });

    }

    //res.sendFile(path.join(__dirname + "../../../../views/eventJoined.html"));
})

module.exports = userDelete;