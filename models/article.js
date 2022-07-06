const mongoose = require('mongoose');

const validateUrl = (v) => {
  /^(http|https):\/\/[^ "]+$/.test(v);
};
const setMessage = (props) => `${props.value} is not a valid URL!`;

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: validateUrl,
      message: setMessage,
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: validateUrl,
      message: setMessage,
    },
    required: true,
  },
  owner: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
