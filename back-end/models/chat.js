const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Types: { ObjectId } } = Schema;



const chatSchema = new Schema({
    participants: {
        type: [ObjectId],
        required: true,
        ref: "User"
    },
    timeMsg: {
        type: [Date],
        required: true
    },
    mediaURL: {
        type: String
    }
});

module.exports = Chat = mongoose.model('Chat', chatSchema);