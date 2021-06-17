const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;



const eventSchema = new Schema({
    creator: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    location: {
        coordinates: {
            lat: Number,
            lng: Number
        },

    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photoURL: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    capacity: {
        type: Number
    },
    participants: {
        type: [ObjectId],
        required: true,
        ref: "User"
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = Event = mongoose.model('Event', eventSchema);