const express = require("express");

const githubRoutes = require("./routes/github.routes");

const app = express();

app.use(express.json());

app.use("/api/github", githubRoutes);

module.exports = app;