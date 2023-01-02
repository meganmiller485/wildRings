const express = require("express");
const printPostsRouter = express.Router();

const { getAllPosts } = require("../db");

printPostsRouter.use((req, res, next) => {
	console.log("A request is being made to /prints");

	next();
});

printPostsRouter.get("/", async (req, res) => {
	const posts = await getAllPosts();

	res.send({
		posts,
	});
});

module.exports = printPostsRouter;
