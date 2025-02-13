require('dotenv').config();
const db = require('../db/userQueries');

const getMemberForm = (req, res) => {
  res.render('member-form');
}

const memberPasscode = async (req, res) => {
  const {passcode} = req.body;
  if (process.env.MEMBERSHIP_PASSWORD == passcode) {
    await db.grantMembership(req.user.id);
    res.redirect('/');
  } else {
    res.render('member-form', {allert: 'Wrong passcode, try again!'});
  }
}

module.exports = {
  getMemberForm,
  memberPasscode
}