module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Totals', [{
      amount: 10000000,
      data: '10.2021',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 12000000,
      data: '11.2021',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 14000000,
      data: '12.2021',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 14000000,
      data: '01.2022',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 14500000,
      data: '02.2022',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 9000000,
      data: '03.2022',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount:7500000,
      data: '04.2022',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 10000000,
      data: '05.2022',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 12000000,
      data: '06.2022',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 13000000,
      data: '07.2022',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 16000000,
      data: '08.2022',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      amount: 18045197,
      data: '09.2022',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Totals');
  },
};