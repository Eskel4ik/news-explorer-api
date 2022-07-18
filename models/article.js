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
    default: 'Title',
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
    unique: true,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: validateUrl,
      message: setMessage,
    },
    required: true,
    default: 'https://cdn.dribbble.com/users/88213/screenshots/8560585/media/7263b7aaa8077a322b0f12a7cd7c7404.png?compress=1&resize=400x300',
  },
  owner: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
