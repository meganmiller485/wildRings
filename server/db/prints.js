const client = require('./client');

async function createPrint({ title, image, description, location, groups }) {
  try {
    const {
      rows: [print],
    } = await client.query(
      `
            INSERT INTO prints ( title, image, description, location, groups)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (title) DO NOTHING
            RETURNING *;
        `,
      [title, image, description, location, groups]
    );

    return print;
  } catch (error) {
    throw error;
  }
}

async function getAllPrints() {
  try {
    const { rows } = await client.query(`SELECT * FROM prints;`);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPrintById(id) {
  try {
    const { rows: print } = await client.query(
      `
      SELECT *
      FROM prints
      WHERE id = ${id};
      `
    );
    console.log('These are our prints by id:', print);
    return print;
  } catch (error) {
    throw error;
  }
}

async function getPrintByTitle(title) {
  try {
    const { rows: print } = await client.query(
      `
      SELECT *
      FROM prints
      WHERE title = $1;
      `,
      [title]
    );
    console.log('These are our prints by title:', print);
    return print;
  } catch (error) {
    throw error;
  }
}

async function getPrintByLocation(location) {
  try {
    const { rows: print } = await client.query(
      `
      SELECT *
      FROM prints
      WHERE location = $1;
      `,
      [location]
    );
    console.log('These are our prints by location:', location);
    return print;
  } catch (error) {
    throw error;
  }
}

async function getPrintByActive(active) {
  try {
    const { rows: print } = await client.query(
      `
      SELECT *
      FROM prints
      WHERE active = $1;
      `,
      [active]
    );
    console.log('These are our prints by active:', active);
    return print;
  } catch (error) {
    throw error;
  }
}

async function updatePrint(id, { ...fields }) {
  console.log('id:', id, 'update fields:', fields);
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    const {
      rows: [print],
    } = await client.query(
      `
      UPDATE prints
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
      `,

      Object.values(fields)
    );
    console.log('These are my updated prints: ', print);
    return print;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPrint,
  getAllPrints,
  getPrintById,
  getPrintByTitle,
  getPrintByLocation,
  getPrintByActive,
  updatePrint,
};
