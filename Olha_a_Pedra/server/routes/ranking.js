const express = require('express');
const router = express.Router();
const Ranking = require('../models/Ranking'); // Modelo de ranking que você precisa criar

// Obter ranking
router.get('/', async (req, res) => {
    try {
        const rankings = await Ranking.find().sort({ score: -1 });
        res.status(200).json(rankings);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
});

// Deletar pontuação de jogador
router.delete('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        await Ranking.deleteOne({ username });
        res.status(200).send('Pontuação deletada com sucesso');
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;
