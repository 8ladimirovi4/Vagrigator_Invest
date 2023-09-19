module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Cashs', [{
      quantity: 500000,
      price: 100,
      type: 'cashTestType',
      date: 'cashTestDate',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Riders');
  },
};