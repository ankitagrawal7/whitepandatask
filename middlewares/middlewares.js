const secret = 'secret';
const User = require("./../models/user");
const jwt = require('jsonwebtoken');
const memoryCache = require("memory-cache");

exports.cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

exports.authorize = async (req, res, next) => {    
    try {
        const token = req.cookies.rememberme;
        if(!token) throw new Error();

        const data = jwt.verify(token, secret);

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

exports.cache = (duration) => (req, res, next) => {
    const key = req.url;
    const cached = memoryCache.get(key);
    if(cached){
        res.send(cached);
        return;
    }else{
        res.sendResponse = res.send;
        res.send = (body) => {
            memoryCache.put(key, body, duration*1000);
            res.sendResponse(body);
        }
    }
    next();
}