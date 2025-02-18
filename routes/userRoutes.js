const {Router} = require('express');
const controller = require('../controllers/userController');

const router = Router();

router.get('/member-form', controller.getMemberForm);
router.post('/member-form', controller.memberPasscode);
router.get('/admin-form', controller.getAdminForm);
router.post('/admin-form', controller.adminPasscode);

module.exports = router;