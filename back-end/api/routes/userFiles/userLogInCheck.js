require('dotenv').config();

const express = require('express');
const User = require('../../../models/user');
const userLogInCheck = express.Router();
const bcrypt = require('bcrypt');
const userSaveInfo = require('./userSaveInfo');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const ObjectId  = require('mongodb').ObjectID;

var path = require('path');

const { env: { JWT_SECRET, JWT_EXP } } = process;


userLogInCheck.use(async(req, res) => {
    let body = req.body.credentials;
    console.log(req)
    //console.log(req.body)
    console.log(body.email)
    console.log(body.password)

    const found = await User.findOne({ email: body.email });

    if (found) {
        //const dbpassword = found.password;
        const validPassword = await bcrypt.compare(body.password, found.password);
        if (validPassword) {
            const { _id, userImage } = found;
            const token = await jwt.sign({ sub: _id.toString() }, JWT_SECRET, { expiresIn: JWT_EXP });
            //console.log(_id);
            //console.log(userImage);
            console.log(token)
            /*
            let query = {_id : ObjectId(_id)};
            const db = mongoose.connection;
            db.collection('users').find(query, {userImage: 1}).toArray(function(err, result) {
                if (err) {
                  console.log("Error");
                } else {
                  console.log(result);
            }
        });
        */
        
            //console.log(cursor);
            
            await res.send({ token, userImage });

           
        } else {
            res.status(400).json({ message: "Invalid Password" });
            console.log("hola")
        }
    } else {
        
        res.status(400).json({ message: "User not found" });
        console.log("hola")
    }
  
})

module.exports = userLogInCheck;