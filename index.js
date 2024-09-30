const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const { MGDB_USERNAME, MGDB_PASSWORD, MGDB_IP, MGDB_PORT } = require("./config/config");

app.get("/", (req, res) => {
    res.send("Xin chào mọi người");
});

const connectWithRetry = () => {
    mongoose
        .connect(`mongodb://${MGDB_USERNAME}:${MGDB_PASSWORD}@${MGDB_IP}:${MGDB_PORT}`)
        .then(() => console.log("MongoDB Connected."))
        .catch((err) => {console.log("Error Connect!"); setTimeout(connectWithRetry, 5000)});
};
console.log(`mongodb://${MGDB_USERNAME}:${MGDB_PASSWORD}@${MGDB_IP}:${MGDB_PORT}/myDB`)
connectWithRetry();
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", UserSchema);

app.post("/add-user", async (req, res) => {
    try {
        console.log(req);
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: "User added successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error adding user", error });
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})