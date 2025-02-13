const bcrypt = require('bcryptjs');
const db = require('../db/authQueries');

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

const login = (req, res) => {
  res.render('login');
}

const signup = (req, res) => {
  res.render('signup');
}

const registerUser = async (req, res, next) => {
  try {
    const {first_name, last_name, email, username, password, membership_status} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(first_name, last_name, email, username, hashedPassword, membership_status);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  logout,
  login,
  signup,
  registerUser
}