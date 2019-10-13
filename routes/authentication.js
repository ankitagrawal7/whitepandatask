
const router = require("express").Router();
const User = require("./../models/user");
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const accountSid = 'ACf9ec2d7f88200e6add11d295586a987e';
const authToken = 'd2ba668a7f4c937fb25e045e0aac4844';
const secret = 'secret';
const client = require('twilio')(accountSid, authToken);

router.post("/verify", async (req, res) => {

    try {
        const type = (req.body.email)? "email" : "mobile";
        const user = await User.findOne({$or: [
                                { email: req.body.email, mobileNumber: { $nin: [ undefined, null ] } },
                                { mobileNumber: req.body.mobileNumber, email: { $nin: [ undefined, null ] } }
                            ]});

        if (user) {
            if(type === "mobile"){
                const otp = generateOTP(6);
                await User.updateOne({mobileNumber: user.mobileNumber}, {otp: otp});

                const message = await client.messages.create({
                    body: `OTP - ${otp}`,
                    from: '+12568277534',
                    to: user.mobileNumber
                });

                console.log(message.sid)
            }

            res.status(200).send({
                "isRegistered": true,
                "msg": "User already present. Please login."
            });
        } else {
            res.status(406).send({
                "isRegistered": false,
                "msg": "User not present. Please register."
            });
        }
    } catch (error) {
        console.log("[Error]: ", error);
        res.status(500).send({
            msg: "Something went wrong. Please contact administrator."
        })
    }
});

router.post("/register", (req, res) => {

    let hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
        email: req.body.email,
        password: hash,
        mobileNumber: req.body.mobileNumber,
        name: req.body.name,
        accessToken: req.body.accessToken
    });

    newUser.save()
           .then(user => {

            const token = jwt.sign({
                user_id: user._id
            }, secret);

            res.status(200).send({
               msg: "Registration Successfull",
               token
            });
        }).catch(err => res.status(500).send(err));
});

router.post("/login", (req, res) => {
    const type = (req.body.email)? "email" : "mobile";
    User.findOne({$or: [
        { email: req.body.email, mobileNumber: { $nin: [ undefined, null ] } },
        { mobileNumber: req.body.mobileNumber, email: { $nin: [ undefined, null ] } }
    ]}).then(user => {
        if (user && verify(type, req.body, user)) {
            const token = jwt.sign({
                user_id: user._id
            }, secret);

            res.status(200).send({
                msg: "Login Successful",
                token
            })
        } else {
            res.status(406).send({
                msg: "Invalid credentials."
            });
        }
    }).catch(error => {
        console.log("[Error]: ", error);
        res.status(500).send({
            msg: "Something went wrong. Please contact administrator."
        })
    });
});

function verify(type, form, user) {
    if(type === "email"){
        return bcrypt.compareSync(form.password, user.password);
    }else{
        return user.otp == form.otp;
    }
}

function generateOTP(length){
    var digits = '0123456789';
    var otp = '';

    for(let i = 1; i <= length; i++){
        var index = Math.floor(Math.random()*(digits.length));
        otp = otp + digits[index];
    }
    return Number(otp);
}

module.exports = router;