const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const testPass = process.env.TEST_USER_PASSWORD ?? '123456789';

    const hash = await bcrypt.hash(testPass, 10);

    const testUser = {
      login: 'treider',
      password: hash,
      email:'treider@snp.com',
      jwt: 't.XgsdI_79Fm9NVATZt9QHzxt2OdlPP0b8F0MsffeRSpFYsAVh-R148DM0yFebOMTcAYLqEu4R92H4Io22nMIs9w',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert('Users', [testUser]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};