const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    hashtags: {
        type: [String],
        required: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Discussion', discussionSchema);
