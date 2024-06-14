const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// Get list of users
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Search users
router.get('/search', auth, async (req, res) => {
    const { name } = req.query;
    try {
        const users = await User.find({ name: new RegExp(name, 'i') }).select('-password');
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Follow a user
router.post('/follow/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const userToFollow = await User.findById(req.params.id);

        if (!userToFollow) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.following.includes(userToFollow._id)) {
            user.following.push(userToFollow._id);
        }

        if (!userToFollow.followers.includes(user._id)) {
            userToFollow.followers.push(user._id);
        }

        await user.save();
        await userToFollow.save();

        res.json({ message: 'User followed' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Unfollow a user
router.post('/unfollow/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const userToUnfollow = await User.findById(req.params.id);

        if (!userToUnfollow) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.following = user.following.filter(followingId => followingId.toString() !== userToUnfollow._id.toString());
        userToUnfollow.followers = userToUnfollow.followers.filter(followerId => followerId.toString() !== user._id.toString());

        await user.save();
        await userToUnfollow.save();

        res.json({ message: 'User unfollowed' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
