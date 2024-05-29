import express from 'express';
import calculatorRoutes from './src/routes/calculatorRoutes';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/views'));

app.use('/calculator', calculatorRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});