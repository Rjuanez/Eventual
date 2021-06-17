require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const jwt = require('jsonwebtoken');

const { env: { PORT, MONGODB_URL } } = process;

//Home files
const homeView = require('./api/routes/homeFiles/homeView');

// User files
const userShowView = require('./api/routes/userFiles/userShowView');
const userSaveInfo = require('./api/routes/userFiles/userSaveInfo');
const userLogIn = require('./api/routes/userFiles/userLogIn');
const userLogInCheck = require('./api/routes/userFiles/userLogInCheck');
const userUpdate = require('./api/routes/userFiles/userUpdate');
const userDelete = require('./api/routes/userFiles/userDelete')
const userList = require('./api/routes/userFiles/userList')
const userRouter = require('./api/routes/userFiles/userRouter')

//Event files
const eventCreate = require('./api/routes/eventFiles/eventCreate');
const eventSave = require('./api/routes/eventFiles/eventSave');
const eventList = require('./api/routes/eventFiles/eventList')
const eventJoin = require('./api/routes/eventFiles/eventJoin')
const eventUpdate = require('./api/routes/eventFiles/eventUpdate')
const eventInfo = require('./api/routes/eventFiles/eventInfo')

//Chat files
const chatRouter = require('./api/routes/chatFiles/chatRouter');

//Eventual files
const eventualRouter = require('./api/routes/eventualFiles/eventualRouter');

//Location files
const locationRouter = require('./api/routes/locationFiles/locationRouter');


const cors = require('cors');
const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//Database connection
mongoose.connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log('Database is connected');
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.set("view engine", "ejs"); //NUEVAA

        //ROUTES

        //Home route
        app.route('/').get(homeView);

        //User routes
        app.route('/user/register').get(userShowView);
        app.route('/user/register').post(userSaveInfo);
        app.route('/user/login').get(userLogIn);
        app.route('/user/login').post(userLogInCheck);
        app.route('/user/update').put(userUpdate);
        app.route('/user/delete').delete(userDelete);
        app.route('/user/list').get(userList);
        app.route('/user/currentuser').get(userRouter)


        //Event routes
        app.route('/event/create').get(eventCreate);
        app.route('/event/create').post(eventSave);
        app.route('/event/list').get(eventList);
        app.route('/event/join/:id').post(eventJoin);
        app.route('/event/update').put(eventUpdate);
        app.route('/event/info/:id').get(eventInfo)
        //app.get('/event/info/:id', eventInfo)
        //app.route('/event/info/:id').get(eventInfo)

        app.use('/uploads', express.static('uploads'));


        /*
        app.route('/events', eventRouter);

        app.route('/eventuals', eventualRouter);

        app.route('/locations', locationRouter);

        app.route('/chat', chatRouter);*/
        app.use('*', (req, res) => res.status(404).send(`The resource was not found`))
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

        
    })
    .catch((error) => {
        console.log(error)

        if (mongoose.connection.readyState === 1)
            return mongoose.disconnect()
                .catch(console.error)
                .then(() => process.exit())
    });