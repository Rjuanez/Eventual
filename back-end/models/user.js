const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Types: { ObjectId } } = Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    birthday: {
        type: Date,
        required: true
    },
    photoURL: {
        type: String
    },
    friends: {
        type: [ObjectId]
    },
    eventsCreated: {
        type: [ObjectId],
        ref: "Event"
    },
    eventualsCreated: {
        type: [ObjectId],
        ref: "Eventual"
    },
    locations: {
        type: [ObjectId],
        ref: "Location"
    },
    actualLocation: {
        type: String
    },
    chats: {
        type: [ObjectId],
        ref: "Chat"
    },
    userImage: {
        type: String,
        required: false
    }
});

module.exports = User = mongoose.model('User', userSchema);