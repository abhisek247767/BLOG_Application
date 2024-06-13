const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhisek:abhisek@cluster0.byyykdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Routes
const userRoutes = require('./routes/users');
const discussionRoutes = require('./routes/discussions');

app.use('/users', userRoutes);
app.use('/discussions', discussionRoutes);

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
