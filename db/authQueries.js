const pool = require('./pool');

const createUser = async (firstName, lastName, email, username, hashedPassword, membershipStatus) => {
  await pool.query(`
    INSERT INTO users
    (first_name, last_name, email, username, password, membership_status, admin)
    VALUES ($1, $2, $3, $4, $5, 'non-member', 'false')`,
    [firstName, lastName, email, username, hashedPassword]
  );
}

const findByUsername = async (username) => {
  const {rows} = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
  return rows[0] || null;
}

module.exports = {
  createUser,
  findByUsername
}