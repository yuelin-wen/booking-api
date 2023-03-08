const User = require("../models/User")

module.exports.createUser = async (req, res, next) => {
    async (req, res) => {
        const newUser = new User(req.body)
        try {
            const savedUser = await newUser.save()
            res.status(200).json(savedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted User")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}
