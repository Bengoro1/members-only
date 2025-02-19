const { Router } = require('express');
const controller = require('../controllers/messagesController');

const router = Router();

router.get('/new', controller.newMessageForm);
router.post('/new', controller.newMessagePost);
router.post('/:messageId/delete', controller.messageDelete);

module.exports = router;