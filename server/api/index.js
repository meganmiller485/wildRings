const express = require("express");
const apiRouter = express.Router();

//ATTACH api routers
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const printPostsRouter = require("./printPosts");
apiRouter.use("/posts", printPostsRouter);

module.exports = apiRouter;
