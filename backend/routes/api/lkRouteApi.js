const lkRouterApi = require('express').Router();

const { Total, Reit, Auto, Cash, User } = require('../../db/models');
const { TinkoffInvestApi } = require("tinkoff-invest-api");

lkRouterApi.get('/', async (req, res) => {

  const { id } = req.session.user;
  const [ token ] = await User.findAll({raw:true, where:{ id }})
  const api = new TinkoffInvestApi({ token: token.jwt });
  const { accounts } = await api.users.getAccounts({});
  const account = accounts[0] 
  console.log('===> account', account)
  const portfolio = await api.operations.getPortfolio({ accountId: account?.id });
  const totalStock = Number(String(portfolio.totalAmountShares.units) + '.' +  String(portfolio.totalAmountShares.units)) + Number(String(portfolio.totalAmountCurrencies.units) + '.' +  String(portfolio.totalAmountCurrencies.units));
  
  const historyData = await Total.findAll({raw:true, where:{ user_id: id }});

  const realEstate = await Reit.findAll({ raw: true, where: { user_id: id } });
  const totalPurchaseRealEstate = realEstate
    .map((el) => el.purchase_price)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const totalCurrentRealEstate = realEstate
    .map((el) => el.current_price)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const auto = await Auto.findAll({ raw: true, where: { user_id: id } });
  const totalPurchaseAuto = auto
    .map((el) => el.purchase_price)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const totalCurrentAuto = auto
    .map((el) => el.current_price)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const [ cash ] = await Cash.findAll({raw:true, where:{ user_id: id }});
  
    const data = {
      total: historyData? historyData : 0,
      realEstate: realEstate? { purchasePrice: totalPurchaseRealEstate, currentPrice: totalCurrentRealEstate } : { purchasePrice: 0, currentPrice: 0 },
      auto: auto? { purchasePrice: totalPurchaseAuto, currentPrice: totalCurrentAuto } : { purchasePrice: 0, currentPrice: 0 },
      cash: cash? cash.quantity : 0,
      stock: totalStock? { purchasePrice: totalStock / ( 1 + (portfolio.expectedYield.units + portfolio.expectedYield.nano / 1000000000)/100), currentPrice: totalStock } : { purchasePrice: 0, currentPrice: 0 },
    }
    console.log(0)
    res.json(data)
});

module.exports = lkRouterApi;
