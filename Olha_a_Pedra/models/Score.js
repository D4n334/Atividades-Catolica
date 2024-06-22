const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Score = sequelize.define('Score', {
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Define a relação entre Usuários e Pontuações
User.hasMany(Score);
Score.belongsTo(User);

module.exports = Score;
