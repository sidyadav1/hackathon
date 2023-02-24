const express = require("express");
const routes = require("./routes/index");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
