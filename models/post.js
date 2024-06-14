const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    image: { type: String },
    hashtags: [String],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        text: String,
        likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        replies: [{
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            text: String,
            likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
        }]
    }],
    viewCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
