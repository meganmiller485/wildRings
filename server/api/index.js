const express = require("express");
const apiRouter = express.Router();

//ATTACH api routers
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
