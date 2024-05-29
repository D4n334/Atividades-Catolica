const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/result', (req, res) => {
    res.render('resultado', { result: req.result });
});

router.post('/calculate', calculatorController.calculate);

module.exports = router;