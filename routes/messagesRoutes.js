const { Router } = require('express');
const controller = require('../controllers/messagesController');

const router = Router();

router.get('/new', controller.newMessageForm);
router.post('/new', controller.newMessagePost);

module.exports = router;