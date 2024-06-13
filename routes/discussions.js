const express = require('express');
const router = express.Router();
const Discussion = require('../models/discussion');
const multer = require('multer');
const path = require('path');

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

// Create Discussion
router.post('/', upload.single('image'), async (req, res) => {
    const { text, hashtags, userId } = req.body;
    const image = req.file ? req.file.path : '';
    const hashtagsArray = hashtags ? hashtags.split(',') : [];
    const discussion = new Discussion({ text, image, hashtags: hashtagsArray, userId });
    try {
        await discussion.save();
        res.status(201).json(discussion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Discussion
router.put('/:id', upload.single('image'), async (req, res) => {
    const { text, hashtags, userId } = req.body;
    const image = req.file ? req.file.path : '';
    const hashtagsArray = hashtags ? hashtags.split(',') : [];
    try {
        const discussion = await Discussion.findByIdAndUpdate(req.params.id, { text, image, hashtags: hashtagsArray, userId }, { new: true });
        if (!discussion) return res.status(404).json({ error: 'Discussion not found' });
        res.json(discussion);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Discussion
router.delete('/:id', async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndDelete(req.params.id);
        if (!discussion) return res.status(404).json({ error: 'Discussion not found' });
        res.json({ message: 'Discussion deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get list of discussions based on tags
router.get('/tags', async (req, res) => {
    const { tags } = req.query;
    try {
        const discussions = await Discussion.find({ hashtags: { $in: tags.split(',') } });
        res.json(discussions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get list of discussions based on text
router.get('/search', async (req, res) => {
    const { text } = req.query;
    try {
        const discussions = await Discussion.find({ text: new RegExp(text, 'i') });
        res.json(discussions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
