const User = require('../models/user');
const AppError = require('../errors/app-error');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new AppError(404, 'No user found with that id');
      }
      res.send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
