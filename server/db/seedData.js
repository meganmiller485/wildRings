const client = require('./client');
require('dotenv').config();

const {
  createUser,
  getUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
} = require('./users');
const {
  createPrint,
  getAllPrints,
  getPrintById,
  getPrintByTitle,
  getPrintByLocation,
  getPrintByActive,
} = require('./prints');
const {
  createRoles,
  getAllRoles,
  getRoleById,
  getRoleByCode,
  getRoleByName,
  getRoleByActive,
  getUserByRoleId,
  updateRoles,
} = require('./roles');
const {
  createUserRoles,
  getAllUserRoles,
  getUserRoleById,
  updateUserRoles,
  getFullRoleByUserId,
} = require('./userRoles');

async function dropTables() {
  try {
    console.log('Dropping all tables...');

    await client.query(`
        DROP TABLE IF EXISTS userRoles;
        DROP TABLE IF EXISTS roles;
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
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          active BOOLEAN DEFAULT true,
          UNIQUE (username, email)
        );

        CREATE TABLE prints (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) UNIQUE NOT NULL,
          image VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          location VARCHAR(255) NOT NULL,
          groups VARCHAR(255),
          active BOOLEAN DEFAULT true
        );

        CREATE TABLE roles (
          id SERIAL PRIMARY KEY,
          rolename VARCHAR(255) DEFAULT 'user',
          rolecode VARCHAR(255) DEFAULT 1,
          description TEXT,
          createdOn DATE,
          active BOOLEAN DEFAULT true
        );
  
        CREATE TABLE userRoles (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "roleId" INTEGER REFERENCES roles(id)
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
        name: 'Megan Miller',
        email: 'megan@gmail.com',
        username: 'meg',
        password: 'mill1',
      },
      {
        name: 'Lindsay Miller',
        email: 'lindsay@gmail.com',
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
        title: 'Columbia River Gorge',
        image: 'No Image',
        description:
          "Timber company, Weyerhaeuser, plans to clear cut over 25-acres of forest near Hood River. 'Friends is very concerned by the proposed clearcuts and the significant adverse effects on the scenic, natural, cultural and recreation resources of the Columbia River Gorge that would result if this project moves forward as proposed.' -Michael Lang",
        location: 'Oregon',
        groups:
          'Hood River Soil and Water Conservation, Gorge Ecology Outdoors, Columbia Riverkeeper',
      },
      {
        title: 'Fairy Creek',
        image: 'No Image',
        description:
          "The battle at Fairy Creek, a fight over some of the planet's oldest trees, has raged for two summers and has led to the most arrest ever for protest in modern Canadian history",
        location: 'British Columbia',
        groups: 'Ancient Forest Alliance, Evergreen Alliance',
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

async function createFakeRoles() {
  try {
    const fakeRole = [
      {
        rolename: 'user',
        rolecode: 1,
        description: 'user sells and trades',
        createdOn: '2023-02-19',
      },
      {
        rolename: 'admin',
        rolecode: 2,
        description: 'admin can change stuff',
        createdOn: '2023-02-19',
      },
    ];
    const fakeRoles = await Promise.all(fakeRole.map(createRoles));
    console.log('roles created:');
    console.log(fakeRoles);
    console.log('Finished creating roles!');
  } catch (error) {
    console.error('Error creating roles!');
    throw error;
  }
}

async function createFakeUserRoles() {
  try {
    const fakeUserRole = [
      {
        userId: 1,
        roleId: 2,
      },
      {
        userId: 2,
        roleId: 2,
      },
    ];
    const fakeUserRoles = await Promise.all(fakeUserRole.map(createUserRoles));
    console.log('user roles created:');
    console.log(fakeUserRoles);
    console.log('Finished creating user roles!');
  } catch (error) {
    console.error('Error creating user roles!');
    throw error;
  }
}

async function testDB() {
  try {
    console.log('Test database...');

    //********** USER TESTS *************
    const users = await getAllUsers();
    console.log('getAllUsers:', users);

    const userByUsername = await getUserByUsername('meg');
    console.log('getUserByUsername', userByUsername);

    const user = await getUser('meg', 'mill1');
    console.log('getUser', user);

    const userById = await getUserById(2);
    console.log('getUserById', userById);

    const userByEmail = await getUserByEmail('lindsay@gmail.com');
    console.log('getUserByEmail', userByEmail);

    // const updatedUser = await updateUser(1, {
    //   name: 'Elan Raanan',
    //   email: 'elan@yahoo.com',
    //   username: 'elan',
    //   password: 'elan123',
    // });
    // console.log('updateUser', updatedUser);

    //********** PRINT TESTS *************

    const allPrints = await getAllPrints();
    console.log('getAllPrints', allPrints);

    const printById = await getPrintById(1);
    console.log('getPrintById', printById);

    const printByTitle = await getPrintByTitle('Fairy Creek');
    console.log('getPrintByTitle', printByTitle);

    const printByLocation = await getPrintByLocation('Oregon');
    console.log('getPrintByLocation', printByLocation);

    const printByActive = await getPrintByActive(true);
    console.log('getPrintByActive', printByActive);

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
    await createFakeRoles();
    await createFakeUserRoles();
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
