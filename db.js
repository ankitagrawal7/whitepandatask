const mongoose = require("mongoose");

mongoose.connect("mongodb://sample:Qwerty%4012345@ds135068.mlab.com:35068/sampledb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;

    console.log("Connected");
})