const calculator = require('../calculator/calculator');

exports.calculate = (req, res) => {
    const number1 = parseFloat(req.body.number1);
    const number2 = parseFloat(req.body.number2);
    const operator = req.body.operator;

    if (isNaN(number1) || isNaN(number2)) {
        return res.redirect('/');
    }

    const result = calculator[operator](number1, number2);
    req.result = result;

    res.redirect('/result');
};