const bcrypt = require('bcrypt');
require("dotenv").config();

module.exports = {
  async up(queryInterface) {
    const testPass = process.env.TEST_USER_PASSWORD ?? '123456789';

    const hash = await bcrypt.hash(testPass, 10);

    const testUser = {
      login: 'treider',
      password: hash,
      email:'treider@snp.com',
      jwt: process.env.JWT || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert('Users', [testUser]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};