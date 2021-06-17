const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    geolocation: {
        type: String,
        required: true
    },
    alias: {
        type: String
    },
    photoURL: {
        type: String
    }
});

module.exports = Location = mongoose.model('Location', locationSchema);