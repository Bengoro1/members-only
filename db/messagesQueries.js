const pool = require('./pool');

const postNewMessage = async (title, message, userId) => {
  await pool.query('INSERT INTO messages (title, added, message, user_id) VALUES ($1, NOW(), $2, $3)', [title, message, userId]);
}

module.exports = {
  postNewMessage
}