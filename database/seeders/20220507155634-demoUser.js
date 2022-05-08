'use strict';
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

function hashPassword (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

module.exports = {
  async up (queryInterface) {
    const users = [
      {
        id: faker.datatype.uuid(),
        username: 'hr',
        password: hashPassword('password'),
        name: 'HR',
        role: 'HR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        username: 'hr2',
        password: hashPassword('password'),
        name: 'HR 2',
        role: 'HR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        username: 'vendor',
        password: hashPassword('password'),
        name: 'Vendor',
        role: 'Vendor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        username: 'vendor2',
        password: hashPassword('password'),
        name: 'Venor 2',
        role: 'Vendor',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Users', users);
  },

  async down () {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
