const express = require('express');
const Event = require('../../../models/event');
const eventList = express.Router();
var path = require('path');
const jwtParser = require('./../../../middlewares/jwtParser');
const mongoose = require('mongoose');


//eventList.use(jwtParser);

eventList.use((req, res) => {
    const db = mongoose.connection;
    let query = {};
    db.collection('events').find(query).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        //console.log(result);;
        //console.log(cursor);
        //res.cursor.json();

        //res.sendFile(path.join(__dirname + "../../../../views/createEvent.html"));
    });
});
module.exports = eventList;