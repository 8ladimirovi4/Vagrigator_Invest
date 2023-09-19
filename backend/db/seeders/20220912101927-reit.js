'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Reits',
      [
        {

          name: "Дом в Луге",
          type: "reit",
          purchase_price: 5000000,
          current_price: 7500000,
          currency: "rub",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {

          name: "Квартира в Калининграде",
          type: "reit",
          purchase_price: 4500000,
          current_price: 6500000,
          currency: "rub",
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Reits');
  },
};
