const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MGDB_USERNAME, MGDB_PASSWORD, MGDB_IP, MGDB_PORT } = require("./config/config");

app.get("/", (req, res) => {
    res.send("Hello World");
});
const connectWithRetry = () => {
    mongoose
        .connect(`mongodb://${MGDB_USERNAME}:${MGDB_PASSWORD}@${MGDB_IP}:${MGDB_PORT}`)
        .then(() => console.log("MongoDB Connected."))
        .catch((err) => {console.log("Error Connect!"); setTimeout(connectWithRetry, 5000)});
};
connectWithRetry();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})