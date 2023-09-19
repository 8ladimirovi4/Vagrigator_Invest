const lineRouterApi = require('express').Router();
const { TinkoffInvestApi } = require("tinkoff-invest-api");
const api = new TinkoffInvestApi({ token: process.env.TINKOFF_TOKEN ?? "..." });
const {
    InstrumentStatus,
    InstrumentIdType,
    InstrumentRequest,
  } = require("tinkoff-invest-api/cjs/generated/instruments");

lineRouterApi.get('/', async (req, res) => {
  const allPrices = await api.instruments.shareBy({
    idType: InstrumentStatus.INSTRUMENT_ID_TYPE_TICKER,
    id: 'AAPL',
    classCode: "SPBXM",
  })
  console.log(allPrices)
  res.json(allPrices)
});


module.exports = lineRouterApi;