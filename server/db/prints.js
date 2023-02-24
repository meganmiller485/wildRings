const client = require('./client');

async function createPrint({ authorId, title, image, description }) {
  try {
    const {
      rows: [post],
    } = await client.query(
      `
            INSERT INTO prints ( title, image, description)
            VALUES ($1, $2, $3)
            ON CONFLICT (title) DO NOTHING
            RETURNING *;
        `,
      [title, image, description]
    );

    return post;
  } catch (error) {
    throw error;
  }
}

async function getAllPrints() {
  const { rows } = await client.query(`SELECT * FROM prints;`);
  return rows;
}

module.exports = {
  createPrint,
  getAllPrints,
};
