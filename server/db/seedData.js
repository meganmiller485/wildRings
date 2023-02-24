const client = require('./client');
require('dotenv').config();

const { createUser } = require('./users');
const { createPrint } = require('./prints');

async function dropTables() {
  try {
    console.log('Dropping all tables...');

    await client.query(`
        DROP TABLE IF EXISTS prints ;
        DROP TABLE IF EXISTS users ;

        
        `);

    console.log('All tables dropped.');
  } catch (error) {
    console.error('Error dropping tables.');
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Creating tables...');

    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          active BOOLEAN DEFAULT true
        );

        CREATE TABLE prints (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) UNIQUE NOT NULL,
          image VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          active BOOLEAN DEFAULT true
        );
        `);

    console.log('Tables created.');
  } catch (error) {
    console.error('Error creating tables.');
    throw error;
  }
}

async function createFakeUsers() {
  try {
    console.log('Creating fake users...');

    const fakeUsers = [
      {
        username: 'meg',
        password: 'mill2',
      },
      {
        username: 'linds',
        password: 'mill1',
      },
    ];

    const users = await Promise.all(fakeUsers.map(createUser));
    console.log('Users created:', users);
    console.log('Finished creating users!');
  } catch (error) {
    console.log('Error creating fake users');
    throw error;
  }
}

async function createFakePrints() {
  try {
    console.log('creating prints');

    const fakePrints = [
      {
        title: 'McKenzie River Fire',
        image: 'No Image Yet',
        description:
          "Ranking among the largest wildfires in Oregon's history, The Holiday Farm Fire occurred in 2020, buring a total of 173,393 acres alongside the beautiful McKenzie River vally in Lane County",
      },
      {
        title: 'Cameron Peak Fire',
        image: 'No Image Yet',
        description:
          "Starting near Chambers Lake in the Rocky Mountain's of Colorado, The Cameron Peak Fire devastated roughtly 208,663 acres of land.",
      },
    ];

    const prints = await Promise.all(fakePrints.map(createPrint));
    console.log('Prints created:', prints);
    console.log('Finished creating prints!');
  } catch (error) {
    console.log('Error creating fake prints');
    throw error;
  }
}

async function testDB() {
  try {
    console.log('Test database...');

    // console.log('Calling getAllUsers...');
    // const users = await getAllUsers();
    // console.log('getAllUsers:', users);

    // console.log('Calling getAllPosts...');
    // const posts = await getAllPosts();
    // console.log('getAllPosts', posts);

    console.log('Finished database tests!');
  } catch (error) {
    console.error('Error testing database.');
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createFakeUsers();
    await createFakePrints();
    await testDB();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
