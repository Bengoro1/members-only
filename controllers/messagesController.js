const db = require('../db/messagesQueries');

const newMessageForm = (req, res) => {
  res.render('new', {title: 'New message'});
}

const newMessagePost = async (req, res, next) => {
  try {
    const {title, message} = req.body;
    await db.postNewMessage(title, message, req.user.id);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  newMessageForm,
  newMessagePost
}