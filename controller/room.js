const Room = require("../models/Room")
const Hotel = require("../models/Hotel")

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom.id } })
        } catch (error) {
            res.status(500).json(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (error) {
            res.status(500).json(error)
        }
        res.status(200).json("deleted room")
    } catch (error) {
        res.status(500).json(error)
    }
}

const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllRooms = async (req, res) => {
    try {
        const room = await Room.find()
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms }