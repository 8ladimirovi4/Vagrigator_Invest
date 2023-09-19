const listRouterApi = require("express").Router();
const { Auto, User } = require("../../db/models");
const { Reit } = require("../../db/models");
const { Cash } = require("../../db/models");
const { TinkoffInvestApi } = require("tinkoff-invest-api");
const {
  InstrumentIdType,
  InstrumentRequest,
} = require("tinkoff-invest-api/cjs/generated/instruments");
const {
  CandleInterval,
} = require("tinkoff-invest-api/cjs/generated/marketdata");

listRouterApi.get("/list/currency", async (req, res) => {
  const { id } =req.session.user;
  const [ token ] = await User.findAll({raw:true, where:{ id }})
  const api = new TinkoffInvestApi({ token: token.jwt });
   // получить список счетов
   const { accounts } = await api.users.getAccounts({});
   const account = id === 1? accounts[1] : accounts[2]
   const portfolio = await api.operations.getPortfolio({ accountId: account.id });
  
  const allCurrencies = await api.operations.getWithdrawLimits({
    accountId: account.id,
   });

   const currencyList = allCurrencies.money.map(el => ({ 
     name: el.currency, 
     units: String(el.units) + '.' + String(el.nano)
    }));
  
  //  console.log('TEST', currencyList)
  res.json(currency);
});

listRouterApi.get("/list/assets", async (req, res) => {
  const { id } = req.session.user;
  const [ token ] = await User.findAll({raw:true, where:{ id }})
  const api = new TinkoffInvestApi({ token: token.jwt });
  // получить список счетов
  const { accounts } = await api.users.getAccounts({});
  const account = id === 1? accounts[1] : accounts[2]
  const portfolio = await api.operations.getPortfolio({ accountId: account.id });
  const allActions = portfolio.positions.filter(el => el.instrumentType === 'share');
  const reqList = await Promise.all(
    allActions.map(async (el) => {
      const info = await api.instruments.shareBy({
        idType: InstrumentIdType.INSTRUMENT_ID_TYPE_FIGI,
        id: el.figi,
        classCode: "",
      });
      return {
        name: info.instrument.name,
        ticker: info.instrument.ticker,
        figi: el.figi,
        units: el.quantity.units,
        price:
          el.averagePositionPrice.units +
          (el.averagePositionPrice.nano / 1000000000),
        currentPrice:
          el.currentPrice.units + (el.currentPrice.nano / 1000000000),
        currency: el.currentPrice.currency,

        percent: (Number( el.currentPrice.units + (el.currentPrice.nano / 1000000000)) - Number(el.averagePositionPrice.units + (el.averagePositionPrice.nano/1000000000))) *100 / Number(el.averagePositionPrice.units + (el.averagePositionPrice.nano/1000000000))
        }
        }))
        res.json(reqList);
  }); 
listRouterApi.post("/list/:figi", async (req, res) => {
  const { id } =req.session.user;
  const [ token ] = await User.findAll({raw:true, where:{ id }})
  const api = new TinkoffInvestApi({ token: token.jwt });
  const { figi } = req.params;
  const { firstDate, lastDate, interval } = req.body;
  if (interval === 1) {
    const test = await api.marketdata.getCandles({
      figi: figi,
      from: new Date(firstDate),
      to: new Date(lastDate),
      interval: CandleInterval.CANDLE_INTERVAL_DAY,
    });
    res.json(test);
  } else if (interval === 2) {
    const test = await api.marketdata.getCandles({
      figi: figi,
      from: new Date(firstDate),
      to: new Date(lastDate),
      interval: CandleInterval.CANDLE_INTERVAL_DAY,
    });
    res.json(test);
  } else {
    const test = await api.marketdata.getCandles({
      figi: figi,
      from: new Date(firstDate),
      to: new Date(lastDate),
      interval: CandleInterval.CANDLE_INTERVAL_HOUR,
    });
    res.json(test);
  }
});
listRouterApi
.route("/reit")
.get(async (req, res) => {
  try {
    const { id } = req.session.user;
    const allReit = await Reit.findAll({raw:true, where:{ user_id: id }});
    res.json(allReit);
  } catch ({ message }) {
    res.json({ message: "reit did not found" });
  }
})
.post(async (req, res) => {
  const { name, purchase_price ,currency } = req.body;
  try {
    const newReit = await Reit.create({
      name,
      type: "reit",
      purchase_price,
      current_price: purchase_price,
      currency,
      user_id: req.session.user.id
    })
    await Cash.decrement({quantity: purchase_price}, {
      where: { user_id: req.session.user.id },
    })
    res.json({newReit})
  } catch ({ message }) {
    res.json({ message: "can't post reit" });
  }
})

listRouterApi
.route("/reit/:id")
.put(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try{
    await Reit.destroy({
      where: {
        id,
      },
    })
    await Cash.increment({quantity: + quantity}, {
      where: { user_id: req.session.user.id },
    })
    res.json({success: true});
  } catch ({message}) {
    res.json({message: 'Update reit error'})
  }
})

listRouterApi
.route("/auto/:id")
.put(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try{
    await Auto.destroy({
      where: {
        id,
      },
    })
    await Cash.increment({quantity: + quantity}, {
      where: { user_id: req.session.user.id },
    })
    res.json({success: true});
  } catch ({message}) {
    res.json({message: 'Update reit error'})
  }
})

listRouterApi
.route("/auto")
.get(async (req, res) => {
  try {
    const { id } = req.session.user;
    const allAuto = await Auto.findAll({raw:true, where:{ user_id: id }});
    res.json(allAuto);
  } catch ({ message }) {
    res.json({ message: "auto did not found" });
  }
})
.post(async (req, res) => {
  const { name, purchase_price ,currency } = req.body;
  try {
    const newAuto = await Auto.create({
      name,
      type: "auto",
      purchase_price,
      current_price: purchase_price,
      currency,
      user_id: req.session.user.id
    })
    await Cash.decrement({quantity: purchase_price}, {
      where: { user_id: req.session.user.id },
    })
    res.json({newAuto})
  } catch ({ message }) {
    res.json({ message: "can't post reit" });
  }
});

module.exports = listRouterApi;
