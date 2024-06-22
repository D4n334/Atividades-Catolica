const sequelize = require('./config/database');
const User = require('./models/User');
const Score = require('./models/Score');

sequelize.sync({ force: true }).then(() => {
    console.log('Database synchronized');
    process.exit();
}).catch(err => {
    console.error('Failed to synchronize database:', err);
    process.exit(1);
});
