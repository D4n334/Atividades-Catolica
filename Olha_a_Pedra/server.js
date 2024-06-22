const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/database');
const User = require('./models/User');
const Score = require('./models/Score');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(session({
    secret: 'seu_secret_muito_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Para HTTPS use true
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username, password } });
        if (user) {
            req.session.user = user;
            res.json({ status: 'Logged in' });
        } else {
            res.status(401).json({ status: 'Login failed' });
        }
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
});

// Rota de registro
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        res.json({ status: 'Registered', user });
    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
});

// Rota para obter o ranking
app.get('/ranking', async (req, res) => {
    try {
        const scores = await Score.findAll({
            include: [{ model: User, attributes: ['username'] }],
            order: [['score', 'DESC']]
        });
        res.json(scores);
    } catch (err) {
        console.error('Erro ao obter ranking:', err);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
});

// Rota para salvar a pontuação
app.post('/save-score', async (req, res) => {
    const { username, score } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            await Score.create({ score, UserId: user.id });
            res.json({ status: 'Score saved' });
        } else {
            res.status(404).json({ status: 'User not found' });
        }
    } catch (err) {
        console.error('Erro ao salvar pontuação:', err);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
});

// Rota para deletar pontuações
app.post('/delete-score', async (req, res) => {
    const { user } = req.body;
    try {
        const userToDelete = await User.findOne({ where: { username: user } });
        if (userToDelete) {
            await Score.destroy({ where: { UserId: userToDelete.id } });
            res.json({ status: 'Score deleted' });
        } else {
            res.status(404).json({ status: 'User not found' });
        }
    } catch (err) {
        console.error('Erro ao deletar pontuação:', err);
        res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
});

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});
