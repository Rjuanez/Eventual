const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Types: { ObjectId } } = Schema;


const interactionSchema = new Schema({
    sender: {
        type: [ObjectId],
        required: true
    }, 
    receiver: {
        type: [ObjectId],
        required: true
    },
    state: {
        type: String,
        required: true,
        default: "Pending"
    },
    type: {
        type: String,
        required: true
    },
    sendTime: {
        type: Date,
        required: true
    },
    lastUpdate: {
        tpye: Date,
        required: true
    }
});

module.exports = Interactions = mongoose.model('Interactions', interactionSchema);