const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const rankingRoutes = require('./routes/ranking');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "pages" directory
app.use(express.static('pages'));

// Routes
app.use('/auth', authRoutes);
app.use('/ranking', rankingRoutes);

// Connect to MongoDB (you need to set up MongoDB URI)
mongoose.connect('your_mongodb_uri_here', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
