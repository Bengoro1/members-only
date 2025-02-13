const pool = require('./pool');

const postNewMessage = async (title, message, userId) => {
  await pool.query('INSERT INTO messages (title, added, message, user_id) VALUES ($1, NOW(), $2, $3)', [title, message, userId]);
}

const showAllMessages = async () => {
  const {rows} = await pool.query(`
    SELECT title, added, message, users.username 
    FROM messages
    LEFT JOIN users ON messages.user_id = users.id;`
  );
  return rows;
}

module.exports = {
  postNewMessage,
  showAllMessages
}