const { client, getAllUsers } = require("./index");

async function dropTables() {
	try {
		console.log("Dropping tables...");

		await client.query(`
        DROP TABLE IF EXISTS users;
        `);

		console.log("Tables dropped.");
	} catch (error) {
		console.error("Error dropping tables.");
		throw error;
	}
}

async function createTables() {
	try {
		console.log("Creating tables...");

		await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        `);

		console.log("Tables created.");
	} catch (error) {
		console.error("Error creating tables.");
		throw error;
	}
}

async function rebuildDB() {
	try {
		//connect the client we defined to db
		client.connect();

		await dropTables();
		await createTables();
	} catch (error) {
		throw error;
	}
}

async function testDB() {
	try {
		console.log("Starting to test database...");

		const users = await getAllUsers();
		console.log("getAllUsers:", users);

		console.log("Finished database tests!");
	} catch (error) {
		console.error("Error testing database.");
		throw error;
	}
}

rebuildDB()
	.then(testDB)
	.catch(console.error)
	.finally(() => client.end);
