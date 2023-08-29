const express = require('express');
const rootRouter = express.Router();
const URL = `/api`;

const authRouter = require("./auth/router");
const award = require("./award/router");

rootRouter.use(`${URL}/auth`, authRouter);
rootRouter.use(`${URL}/award`, award);

module.exports = rootRouter;