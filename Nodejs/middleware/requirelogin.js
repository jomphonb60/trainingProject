const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../key');
const mongoose = require('mongoose')
const UserModel = mongoose.model('users');

module.exports = (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "you must be login1" });
    }
    const token = authorization.replace("bearer ", "")

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be login2" });
        }
        const { _id } = payload
        UserModel.findById(_id).then(userdata => {
            req.user = userdata;

            next();
        })

    })

}