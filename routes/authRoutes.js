const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = Router();

router.get('/log-in', authController.login);
router.post('/log-in', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/logout', authController.logout);
router.get('/sign-up', authController.signup);
router.post('/sign-up', authController.registerUser);

module.exports = router;