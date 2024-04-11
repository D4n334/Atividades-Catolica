const express = require('express');
const calculadora = require('./util/');

const app = express();

app.get('/somar/:a/:b', (req, res) => {
  const { a, b } = req.params;
  const resultado = calculadora.somar(parseInt(a), parseInt(b));
  res.send(`Resultado da soma entre ${a} e ${b} é ${resultado}`);
});

app.get('/subtrair/:a/:b', (req, res) => {
  const { a, b } = req.params;
  const resultado = calculadora.subtrair(parseInt(a), parseInt(b));
  res.send(`Resultado da subtração entre ${a} e ${b} é ${resultado}`);
});

app.get('/multiplicar/:a/:b', (req, res) => {
  const { a, b } = req.params;
  const resultado = calculadora.multiplicar(parseInt(a), parseInt(b));
  res.send(`Resultado da multiplicação entre ${a} e ${b} é ${resultado}`);
});

app.get('/dividir/:a/:b', (req, res) => {
  const { a, b } = req.params;
  try {
    const resultado = calculadora.dividir(parseInt(a), parseInt(b));
    res.send(`Resultado da divisão entre ${a} e ${b} é ${resultado}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});