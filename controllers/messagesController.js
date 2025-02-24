const db = require('../db/messagesQueries');
const {body, validationResult} = require('express-validator');

const emptyErr = 'can\'t be empty.';

const validateNew = [
  body('title')
    .trim()
    .notEmpty().withMessage(`Title ${emptyErr}`),
  body('message')
    .trim()
    .notEmpty().withMessage(`Message ${emptyErr}`),
];

const newMessageForm = (req, res) => {
  res.render('new', {title: 'New message', stylesheet: 'new'});
}

const newMessagePost = [
  validateNew,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('new', {
        title: 'New message',
        stylesheet: 'new',
        errors: errors.array()
      });
    }
    try {
      const {title, message} = req.body;
      await db.postNewMessage(title, message, req.user.id);
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
]

const messageDelete = async (req, res, next) => {
  try {
    if (req.user.admin == 'true') {
      await db.deleteMessage(req.params.messageId);
    }
    res.redirect('/');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  newMessageForm,
  newMessagePost,
  messageDelete
}