//PROVIDES UTILITY FUNCTIONS FOR THE REST OF APP TO USE

const { Client } = require("pg"); //imports the postgres module
//connects our database to a new client hosted on the localhost
const client = new Client("postgres://localhost:5432/wildTreeRings");

async function createUser({ username, password }) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
            INSERT INTO users (username, password) VALUES ($1, $2) 
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `,
			[username, password]
		);

		return user;
	} catch (error) {
		throw error;
	}
}

async function getAllUsers() {
	const { rows } = await client.query(`SELECT id, username FROM users;`);
	return rows;
}

async function createPost({ authorId, title, image, description }) {
	try {
		const {
			rows: [post],
		} = await client.query(
			`
            INSERT INTO printPosts ("authorId", title, image, description)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (title) DO NOTHING
            RETURNING *;
        `,
			[authorId, title, image, description]
		);

		return post;
	} catch (error) {
		throw error;
	}
}

async function getAllPosts() {
	const { rows } = await client.query(`SELECT * FROM printPosts;`);
	return rows;
}

module.exports = {
	client,
	getAllUsers,
	createUser,
	createPost,
	getAllPosts,
};
