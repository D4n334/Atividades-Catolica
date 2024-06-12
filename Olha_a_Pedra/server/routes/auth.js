const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Modelo do usuário para criar

// Rota de registro
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('Email já cadastrado');
        }
        user = new User({ username, email, password });
        await user.save();
        res.status(201).send('Cadastro realizado com sucesso');
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).send('Email ou senha incorretos');
        }
        res.status(200).send('Login bem-sucedido');
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;
