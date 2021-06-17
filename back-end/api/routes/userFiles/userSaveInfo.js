const express = require('express');
const User = require('../../../models/user');
const userSaveInfo = express.Router();
const bcrypt = require('bcrypt');
const userLogInCheck = require('./userLogInCheck');
var path = require('path');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');
const jwtParser = require('./../../../middlewares/jwtParser');
const multer = require("multer")

const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname.replace(/\s+/g, '') );
    }
});

const fileFilter = (req, file, cb) => {
        cb(nul, true);
    
};

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 30
}});



userSaveInfo.use(upload.single('userImage'), (req, res) => {
    
    //console.log(req.file);
    const { body:  { name, lastName, email, password, birthday } } = req
    User.findOne({ email: req.body.email })
        .then(async data => {
            if (data) {
                res.status(409).json({ message: "User already exists" });
                //elimina el archivo en caso de error
                await unlinkAsync(req.file.path);

            } else {
                async function test() {
                    console.log(req.headers);
                    console.log(req.body);
                    console.log(req.file);
                    if (password.length >= 8) {
                        const newUser = new User({ name, lastName, email, password, birthday, userImage: req.file.path });
                        console.log(newUser);
                        //console.log(password);
                        newUser.password = await bcrypt.hash(newUser.password, 10);
                        await newUser.save().then((doc) => res.status(201).send(doc));

                        //    user.save().then((doc) => res.status(201).send(doc));


                        //res.status(200).json({ message: `El usuario ${newUser.name} ${newUser.lastName}, con email: ${newUser.email}, se registró con esta contraseña: ${newUser.password}` });
                        //res.sendFile(path.join(__dirname + "../../../../views/completed.html"));
                    } else {
                        res.status(400).json({ message: "Password too short" });
                        //elimina el archivo en caso de error
                        await unlinkAsync(req.file.path);
                    }
                }
                test();
            }

        });
});
module.exports = userSaveInfo;