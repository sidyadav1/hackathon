const express = require("express");
const app = express();

const authRoutes = require("./auth");

app.use("/", authRoutes);

module.exports = app;
