const client = require('./client');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUser({ username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users (username, password) VALUES ($1, $2) 
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,
      [username, hashedPassword]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: user } = await client.query(`
    SELECT * FROM users;
    `);
    return user;
  } catch (error) {
    console.log('error getting all users');
  }
}

module.exports = {
  getAllUsers,
  createUser,
};
