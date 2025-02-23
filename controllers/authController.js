const bcrypt = require('bcryptjs');
const db = require('../db/authQueries');
const {body, validationResult} = require('express-validator');

const alphaErr = 'must contain only letters.'

const validateRegister = [
  body('first_name')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isAlpha().withMessage(`First name ${alphaErr}`),
  body('last_name')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`),
  body('email')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isEmail().withMessage('Must be a valid email.')
    .normalizeEmail(),
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .custom(async (value) => {
      const user = await db.findByUsername(value);
      if (user) {
        throw new Error('Username is already in use.');
      }
      return true;
    })
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('passwordConfirmation')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
]

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

const login = (req, res) => {
  res.render('login', {title: 'Log in', stylesheet: 'login'});
}

const signup = (req, res) => {
  res.render('signup', {title: 'Sign up', stylesheet: 'signup'});
}

const registerUser = [
  validateRegister,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('signup', {
        errors: errors.array(),
        title: 'Sign up',
        stylesheet: 'signup',
      });
    }
    try {
      const {first_name, last_name, email, username, password, membership_status} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.createUser(first_name, last_name, email, username, hashedPassword, membership_status);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
]

module.exports = {
  logout,
  login,
  signup,
  registerUser
}