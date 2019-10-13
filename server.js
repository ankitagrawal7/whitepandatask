const express = require('express');
const app = express();
const path = require("path");
// const cors = require("cors");
require("./db");
const User = require("./models/user");
const jwt = require('jsonwebtoken');
const secret = 'secret';

app.use(express.json());
// app.use(cors());

app.use(express.static(path.join(__dirname, "frontend/build")));

const authorize = async (req, res, next) => {
    const token = req.header('Authorization')
    const data = jwt.verify(token, secret)
    try {
        const user = await User.findOne({ _id: data.user_id })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}

app.use("/auth", require("./routes/authentication"));
app.use("/user", authorize, require("./routes/user"));

const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`listening on *: ${port}`);
});