//PROVIDES UTILITY FUNCTIONS FOR THE REST OF APP TO USE

const { Client } = require("pg"); //imports the postgres module
//connects our database to a new client hosted on the localhost
const client = new Client("postgres://localhost:5432/wildTreeRings");

async function getAllUsers() {
	const { rows } = await client.query(`SELECT id, username FROM users;`);
	return rows;
}

module.exports = {
	client,
	getAllUsers,
};
