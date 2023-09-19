'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Autos', [{
      name: 'Беговая лошадь Спирит',
      type: 'auto',
      purchase_price: 3000000,
      current_price: 3500000,
      currency: 'rub',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'Жигули',
      type: 'auto',
      purchase_price: 50000,
      current_price: 45000,
      currency: 'rub',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Autos');
  },
};
