const express = require('express');
const Event = require('../../../models/event');
const eventInfo = express.Router({mergeParams: true});
var path = require('path');
const jwtParser = require('./../../../middlewares/jwtParser');
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectID;

eventInfo.use(jwtParser)

eventInfo.use((req, res) => {
    
    const userId = req.userId
    
    const eventId = req.params.id
    //console.log(req.route.path)
    const db = mongoose.connection;
    let query = {_id : ObjectId(eventId)};
    console.log(query)
    db.collection('events').find(query).toArray(function(err, result) {
        if (err) {
          res.status(400).json({success: false, message: "Events not found"})
        } else {
          res.status(200).send(result)
        }
  });
  Event
   .findOne({_id: eventId })
   .populate("participants") // key to populate
   .then(res => {
      console.log(res)
    });
 
  

});
module.exports = eventInfo;