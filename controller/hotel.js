const Hotel = require("../models/Hotel")

const createHotel = async (req, res, next) => {
    async (req, res) => {
        const newHotel = new Hotel(req.body)
        try {
            const savedHotel = await newHotel.save()
            res.status(200).json(savedHotel)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

const updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted hotel")
    } catch (error) {
        res.status(500).json(error)
    }
}

const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllHotels = async (req, res) => {
    try {
        const hotel = await Hotel.find()
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

const countByCity = async (req, res) => {
    const cities = req.query.cities.split(",");

    try {
        const list = await Promise.all(cities.map(city => {
            // return Hotel.find({city:city}).length
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json(error)
    }
}

const countByType = async (req, res) => {
    try {
        const hotel = await Hotel.find()
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType }