const express = require('express');
const User = require('../../../models/user');
const Interaction = require('../../../models/interactions')
const userAddFriend = express.Router();
var path = require('path');
const jwtParser = require('./../../../middlewares/jwtParser');
const mongoose = require('mongoose');


userAddFriend.use(jwtParser);

userAddFriend.use(async(req, res) => {
    const {userId} = req
    const isFriend = req.sender.friends.includes(receiver._id)
    const {body: {sender, receiver, type, sendTime, lastUpdate} } = req
    const state= "Pending"
    Interaction.findOneAndDelete({sender, receiver, type, lastUpdate: sendTime})
    .then(async data=> {
        if (data) {
            res.status(400).json({message: "Friend request has already been sent"})
        } else {
            if (!isFriend) {
                const newInteraction = new Interaction({sender, receiver, state, type, sendTime, lastUpdate})
                await newInteraction.save().then((doc) => res.status(201).send(doc))
            } else {
                res.status(400).json({message: "Users are already friends"})
            }
        }
    })
    
});
module.exports = userAddFriend;