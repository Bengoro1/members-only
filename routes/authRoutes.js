const { Router } = require('express');
const passport = require('passport');
const controller = require('../controllers/authController');

const router = Router();

router.get('/log-in', controller.login);
router.post('/log-in', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/logout', controller.logout);
router.get('/sign-up', controller.signup);
router.post('/sign-up', controller.registerUser);

module.exports = router;