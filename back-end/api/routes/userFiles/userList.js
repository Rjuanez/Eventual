const express = require('express');
const User = require('../../../models/user');
const userList = express.Router();
var path = require('path');
const jwtParser = require('./../../../middlewares/jwtParser');
const mongoose = require('mongoose');


userList.use(jwtParser);

userList.use((req, res) => {
    const db = mongoose.connection;
    let query = {};
    db.collection('users').find(query).toArray(function(err, result) {
        if (err) {
            return
        } else {
        res.send(result)
        }
        
    });
});
module.exports = userList;