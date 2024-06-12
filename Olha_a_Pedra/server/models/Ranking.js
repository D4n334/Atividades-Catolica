const mongoose = require('mongoose');

const RankingSchema = new mongoose.Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true }
});

module.exports = mongoose.model('Ranking', RankingSchema);
