const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

articlesRouter.get('/articles', getArticles);

articlesRouter.post('/articles', createArticle);

articlesRouter.delete('/articles/:articleId', deleteArticle);

module.exports = articlesRouter;
