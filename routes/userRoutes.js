const {Router} = require('express');
const controller = require('../controllers/userController');

const router = Router();

router.get('/member-form', controller.getMemberForm);
router.post('/member-form', controller.memberPasscode);

module.exports = router;