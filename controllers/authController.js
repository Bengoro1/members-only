const bcrypt = require('bcryptjs');
const authDb = require('../db/authQueries');

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
  console.log(req.body);
  try {
    const {first_name, last_name, email, username, password, membership_status} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await authDb.createUser(first_name, last_name, email, username, hashedPassword, membership_status);
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