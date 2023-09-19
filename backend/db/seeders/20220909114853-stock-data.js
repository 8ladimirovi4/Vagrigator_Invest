module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Stocks', [{
      name: 'stockTestName',
      ticker: 'stockTestTicker',
      quantity: 60,
      price: 150,
      type: 'stockTestType',
      date: 'stockTestDate',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Stocks');
  },
};