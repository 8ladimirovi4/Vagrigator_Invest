module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Assets', [{
      name: 'assetTestName',
      quantity: 70,
      price: 200,
      type: 'assetTestType',
      date: 'assetTestDate',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Assets');
  },
};