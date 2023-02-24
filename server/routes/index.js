const express = require("express");
const app = express();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const predictionRoutes = require("./predictions");
const teamRoutes = require("./teams");
const matchRoutes = require("./matches");

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", predictionRoutes);
app.use("/", teamRoutes);
app.use("/", matchRoutes);

module.exports = app;
