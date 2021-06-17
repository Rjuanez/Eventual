const express = require('express');
const Event = require('../../../models/event');
const User = require('../../../models/user')
const userUpdate = express.Router();
var path = require('path');
const jwtParser = require('../../../middlewares/jwtParser');
//const userId = require('./../userFiles/userLogInCheck');

userUpdate.use(jwtParser);

userUpdate.use(async(req, res) => {

    const { userId } = req;
    console.log(userId);
    const found = await User.findOne({ _id: userId });
    console.log(found._id);
    //const { creator } = found;

    if (userId == found._id) {
        await User.updateOne({ _id: userId }, { name: "Roger", lastName: "Testing" });
        res.status(200).json({ message: "User updated succesfully" });
    }
    console.log(found);

    //res.sendFile(path.join(__dirname + "../../../../views/eventJoined.html"));
})

module.exports = userUpdate;