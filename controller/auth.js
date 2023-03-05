let User = require('../models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(200).send("User created")
    } catch (err) {
        res.status(500).json(err);
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        const { password, ...others } = user._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { register, login }