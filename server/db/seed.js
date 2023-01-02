const {
	client,
	getAllUsers,
	createUser,
	createPost,
	getAllPosts,
} = require("./index");

async function dropTables() {
	try {
		console.log("Dropping tables...");

		await client.query(`
        
        DROP TABLE IF EXISTS printPosts CASCADE;
        DROP TABLE IF EXISTS users CASCADE;
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
            password VARCHAR(255) NOT NULL,
            active BOOLEAN DEFAULT true
        );
        `);

		await client.query(`
        CREATE TABLE printPosts (
            id SERIAL PRIMARY KEY,
            "authorId" INTEGER REFERENCES users(id) NOT NULL,
            title VARCHAR(255) UNIQUE NOT NULL,
            image VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            active BOOLEAN DEFAULT true
        );`);

		console.log("Tables created.");
	} catch (error) {
		console.error("Error creating tables.");
		throw error;
	}
}

async function createInitialUsers() {
	try {
		console.log("Initializing users");

		const megan = await createUser({
			username: "meg",
			password: "mill2",
		});

		const lindsay = await createUser({
			username: "linds",
			password: "mill1",
		});

		console.log("meg", megan);
		console.log("lindsay", lindsay);
	} catch (error) {
		console.log("Error creating initial users");
		throw error;
	}
}

async function createPrintPost() {
	try {
		console.log("creating print posts");
		const [megan, lindsay] = await getAllUsers();

		const post1 = await createPost({
			authorId: megan.id,
			title: "McKenzie River Fire",
			image: "No Image Yet",
			description:
				"Ranking among the largest wildfires in Oregon's history, The Holiday Farm Fire occurred in 2020, buring a total of 173,393 acres alongside the beautiful McKenzie River vally in Lane County",
		});

		const post2 = await createPost({
			authorId: megan.id,
			title: "Cameron Peak Fire",
			image: "No Image Yet",
			description:
				"Starting near Chambers Lake in the Rocky Mountain's of Colorado, The Cameron Peak Fire devastated roughtly 208,663 acres of land.",
		});

		console.log("First post:", post1);
		console.log("Second post:", post2);
		console.log("Done creating posts.");
	} catch (error) {
		throw error;
	}
}

async function rebuildDB() {
	try {
		//connect the client we defined to db
		client.connect();

		await dropTables();
		await createTables();
		await createInitialUsers();
		await createPrintPost();
	} catch (error) {
		throw error;
	}
}

async function testDB() {
	try {
		console.log("Starting to test database...");

		console.log("Calling getAllUsers...");
		const users = await getAllUsers();
		console.log("getAllUsers:", users);

		console.log("Calling getAllPosts...");
		const posts = await getAllPosts();
		console.log("getAllPosts", posts);

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
