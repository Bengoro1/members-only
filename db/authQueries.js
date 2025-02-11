const pool = require('./pool');

const createUser = async (firstName, lastName, email, username, hashedPassword, membershipStatus) => {
  await pool.query(`
    INSERT INTO users
    (first_name, last_name, email, username, password, membership_status)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [firstName, lastName, email, username, hashedPassword, membershipStatus ?? '']
  );
}

module.exports = {
  createUser
}