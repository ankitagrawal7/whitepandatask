const router = require("express").Router();
const User = require("./../models/user");

router.get("/details", (req, res) => {
    User.findOne({_id: req.user._id}, { password: 0, otp: 0, accessToken: 0 })
        .then(user => res.status(200).send(user))
        .catch(error => {
            console.log("[Error]: ", error);
            res.status(500).send({
                msg: "Something went wrong. Please contact administrator."
            })
        })
})

module.exports = router;