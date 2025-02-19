const pool = require('./pool');

const postNewMessage = async (title, message, userId) => {
  await pool.query('INSERT INTO messages (title, added, message, user_id) VALUES ($1, NOW(), $2, $3)', [title, message, userId]);
}

const showAllMessages = async () => {
  const {rows} = await pool.query(`
    SELECT title, added, message, users.username, messages.id 
    FROM messages
    LEFT JOIN users ON messages.user_id = users.id
    ORDER BY added DESC;`
  );
  return rows;
}

const deleteMessage = async (messageId) => {
  await pool.query(`DELETE FROM messages WHERE id = $1;`, [messageId]);
}

module.exports = {
  postNewMessage,
  showAllMessages,
  deleteMessage
}