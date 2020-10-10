const { check } = require('express-validator');
const User = require('../../models/Users');

module.exports = authValidator = {
  registerUser: [
    check('nama').not().isEmpty().withMessage('Nama tidak boleh kosong'),
    check('email').custom((val) => {
      if (!val) {
        return Promise.reject('Email tidak boleh kosong');
      }
      return User.findOne({ email: val }).then((u) => {
        if (u) {
          return Promise.reject('Email telah dipakai');
        }
      });
    }),
    check('username').custom((val) => {
      if (!val) {
        return Promise.reject('Username tidak boleh kosong');
      }
      return User.findOne({ username: val }).then((u) => {
        if (u) {
          return Promise.reject('Username telah dipakai');
        }
      });
    }),
    check('password').not().isEmpty().withMessage('Kata sandi tidak boleh kosong'),
  ],
  loginUser: [
    check('email')
      .isEmail()
      .withMessage('Email tidak valid')
      .not()
      .isEmpty()
      .withMessage('Email tidak boleh kosong'),
    check('password').not().isEmpty().withMessage('Kata sandi tidak boleh kosong'),
  ],
  forgotPassword: [
    check('email')
      .isEmail()
      .withMessage('Email tidak valid')
      .not()
      .isEmpty()
      .withMessage('Email tidak boleh kosong'),
  ],
};
