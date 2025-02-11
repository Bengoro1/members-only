const path = require('node:path');
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
require('./config/passportConfig');
const isAuthenticated = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/authRoutes');

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
app.get('/', isAuthenticated, (req, res) => {
  res.render('home', {user: req.user});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));