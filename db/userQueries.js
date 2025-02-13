const pool = require('./pool');

const grantMembership = async (user_id) => {
  await pool.query(`UPDATE users SET membership_status = 'member' WHERE id = $1`, [user_id]);
}

module.exports = {
  grantMembership
}