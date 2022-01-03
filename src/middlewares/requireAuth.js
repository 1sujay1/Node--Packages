const jwt = require('jsonwebtoken');
const UserModel = require('./../models/UserModel')

const generateToken = (data) => {
    return jwt.sign(data, "MY_SECRET_KEY")
}

const checkAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ status: false, message: ['Forbidden,you must be logged in'] });

    const token = authorization.split(' ')[1];

    jwt.verify(token, 'MY_SECRET_KEY', async (error, payload) => {
        if (error) {
            return res.status(401).json({ status: false, message: ['Forbidden,you must be logged in'] });
        }
        const { user_id } = payload;

        const findUser = await UserModel.findOne({ _id: user_id }, { email: 1, password: 1 });

        if (!findUser) return res.status(401).json({ status: false, message: ['Forbidden,you must be logged in'] });

        req.user = findUser;
        next();

    })
}

module.exports = { generateToken, checkAuth }