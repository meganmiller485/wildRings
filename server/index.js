const express = require("express");
const server = express();
const PORT = 5000;

//middleware
server.use((req, res, next) => {
	console.log("<____Body Logger START____>");
	console.log(req.body);
	console.log("<_____Body Logger END_____>");

	next();
});

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.get("/api", (req, res) => {
	res.json({ message: "api mainpage is working" });
});

//must connect client where we created all of our data!
const { client } = require("./db");
client.connect();

server.listen(PORT, () => console.log("Server started on port:", PORT));
