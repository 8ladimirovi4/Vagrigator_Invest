require("dotenv").config();
const express = require("express");
// const { sequelize } = require('./db/models');
const config = require("./config/config");
const authRouterApi = require('./routes/api/authRouteApi');
const listRouterApi = require('./routes/api/listRouteApi');
const lkRouterApi = require('./routes/api/lkRouteApi');
const lineRouterApi = require('./routes/api/lineRouteApi');
const app = express();
config(app);
const PORT = process.env.PORT ?? 4000;
app.use('/api', authRouterApi);
app.use('/api/', listRouterApi);
app.use('/api/lk', lkRouterApi);
// app.use('/api/line', lineRouterApi);
app.listen(PORT, async () => {
  try {
    // eslint-disable-next-line no-console
    console.log(`Server started at ${PORT} port...`);
    // await sequelize.authenticate();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
});