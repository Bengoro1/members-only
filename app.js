const path = require('node:path');
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
require('./config/passportConfig');
const isAuthenticated = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const showMessageQuery = require('./db/messagesQueries');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/messages', isAuthenticated, messagesRoutes);
app.use('/user', isAuthenticated, userRoutes);
app.get('/', isAuthenticated, async (req, res) => {
  const _messages = await showMessageQuery.showAllMessages();
  const messages = _messages.map(msg => ({
    ...msg,
    formattedDate: new Date(msg.added).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/,/g, '')
  }));
  res.render('home', {user: req.user, messages: messages, title: `Welcome ${req.user.username}!`, stylesheet: 'home'});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));