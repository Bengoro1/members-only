const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = Router();

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/logout', authController.logout);

module.exports = router;