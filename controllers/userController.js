require('dotenv').config();
const db = require('../db/userQueries');
const {body, validationResult} = require('express-validator');

const validateMemberPasscode = [
  body('passcode')
    .custom(value => {
      if (value.toLowerCase() != process.env.MEMBERSHIP_PASSWORD.toLowerCase()) {
        throw new Error('Wrong passcode, try again!');
      }
      return true;
    })
];

const validateAdminPasscode = [
  body('passcode')
    .custom(value => {
      if (value.toLowerCase() != process.env.ADMIN_PASSWORD.toLowerCase()) {
        throw new Error('Wrong passcode, try again!');
      }
      return true;
    })
];

const getMemberForm = (req, res) => {
  res.render('member-form', {title: 'Become member'});
}

const memberPasscode = [
  validateMemberPasscode, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('member-form', {
        errors: errors.array(),
        title: 'Become member',
      });
    }
    try {
      await db.grantMembership(req.user.id);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
];

const getAdminForm = (req, res) => {
  res.render('admin-form', {title: 'Become admin'});
}

const adminPasscode = [
  validateAdminPasscode, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('admin-form', {
        errors: errors.array(),
        title: 'Become admin',
      });
    }
    try {
      await db.grantAdmin(req.user.id);
      res.redirect('/')
    } catch (err) {
      next(err);
    }
  }
]

module.exports = {
  getMemberForm,
  memberPasscode,
  getAdminForm,
  adminPasscode
}