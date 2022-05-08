'use strict';
const bcrypt = require('bcrypt');

function hashPassword (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

module.exports = {
  async up (queryInterface) {
    const users = [
      {
        id: 'b55738f4-a3c1-4705-86b1-5c9f8c251367',
        username: 'hr',
        password: hashPassword('password'),
        name: 'HR',
        role: 'HR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '069600b0-1c86-4faa-8f04-a72bc38e45ec',
        username: 'hr2',
        password: hashPassword('password'),
        name: 'HR 2',
        role: 'HR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ef9ea0a9-99dc-4c75-b76f-285743084f76',
        username: 'vendor',
        password: hashPassword('password'),
        name: 'Vendor',
        role: 'Vendor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '8d6e3d2d-6225-421c-a051-46e473510069',
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
