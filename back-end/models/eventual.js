const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;



const eventualSchema = new Schema({
    creator: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    location: {
        type: ObjectId,
        required: true,
        ref: "Location"
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    participants: {
        type: [ObjectId],
        required: true,
        ref: "User"
    }
});

module.exports = Eventual = mongoose.model('Eventual', eventualSchema);