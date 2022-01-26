const db = require('./../../models/index');
const bcrypt = require('bcrypt');
const { generateToken } = require('./../../middlewares/requireAuth')

const UserModel = db.user;

const signUp = async (req, res) => {
    try {
        console.log("hello hi");
        const { email, password } = req.body;
        const value = await new UserModel({ email, password: bcrypt.hashSync(password, 8) }).save();
        console.log("value", value);

        if (!value) {
            return res.json({ status: false, message: ['Something went wrong'], data: value });
        }

        else {
            const token = await generateToken({ user_id: value._id })
            return res.json({ status: true, message: ['User Created Successfully'], data: value, token });
        }


    } catch (err) {
        console.log("eMsg", err.message);
        return res.json({ status: false, message: [err.message] })
    }

}

const signIn = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) return res.status(422).json({ status: false, message: ['Email or password is required'] })

        const checkUser = await UserModel.findOne({ email });

        if (!checkUser) return res.json({ status: false, message: ['No user found'] })

        let pwdCheck = bcrypt.compareSync(password, checkUser.password);

        if (!pwdCheck) return res.status(422).json({ status: false, message: ['Invalid password'] })

        const token = await generateToken({ user_id: checkUser._id });

        return res.status(200).json({ status: true, message: [`${checkUser.email} Logged in Successfully`], data: checkUser, token })


    } catch (error) {
        return res.json({ status: false, message: [error.message] })
    }
}

const getUsers = async (req, res) => {
    try {
        let getAllUsers = await UserModel.updateOne({ _id: '61a28c60bdc0c463481a9018' }, { name: 'rohith' });
        res.json({ status: true, data: getAllUsers })
    } catch (error) {
        return res.json({ status: false, message: [error.message] });
    }
}

module.exports = {
    signUp,
    signIn,
    getUsers
}