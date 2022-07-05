const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const articlesRouter = require('./routes/articles');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const centralErrorHandler = require('./middlewares/centralErrorHandler');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());
app.use(helmet());
app.use(errors());
app.use(cors());
app.options('*', cors());
app.use(requestLogger);
app.post('/signin', authRouter);
app.post('/signup', authRouter);
app.use(auth);
app.use(userRouter);
app.use(articlesRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
app.use(errorLogger);
app.use((err, req, res, next) => {
  centralErrorHandler(err, res);
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
