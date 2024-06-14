const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/post');
const auth = require('../middleware/auth');

// Set up file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Create Post
router.post('/', auth, upload.single('image'), async (req, res) => {
    const { text, hashtags } = req.body;
    const image = req.file ? req.file.path : '';
    const hashtagsArray = hashtags ? hashtags.split(',') : [];
    const post = new Post({ text, image, hashtags: hashtagsArray, userId: req.user._id });

    try {
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Post
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    const { text, hashtags } = req.body;
    const image = req.file ? req.file.path : '';
    const hashtagsArray = hashtags ? hashtags.split(',') : [];

    try {
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { text, image, hashtags: hashtagsArray },
            { new: true }
        );
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Post
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Like/Unlike Post
router.post('/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        if (post.likes.includes(req.user._id)) {
            post.likes.pull(req.user._id);
        } else {
            post.likes.push(req.user._id);
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Comment on Post
router.post('/:id/comment', auth, async (req, res) => {
    const { text } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        post.comments.push({ userId: req.user._id, text });
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Like/Unlike Comment
router.post('/:postId/comment/:commentId/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const comment = post.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });

        if (comment.likes.includes(req.user._id)) {
            comment.likes.pull(req.user._id);
        } else {
            comment.likes.push(req.user._id);
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Reply to Comment
router.post('/:postId/comment/:commentId/reply', auth, async (req, res) => {
    const { text } = req.body;
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const comment = post.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });

        comment.replies.push({ userId: req.user._id, text });
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Increment view count
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        post.viewCount += 1;
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
