const mongoose = require("mongoose");
// const Connection_URL = "mongodb://sample:Qwerty%4012345@ds135068.mlab.com:35068/sampledb";
const Connection_URL = "mongodb://localhost:27017/whitepaanda";

mongoose.connect(Connection_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;

    console.log("Connected");
})