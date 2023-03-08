const Hotel = require("../models/Hotel")

module.exports.createHotel = async (req, res, next) => {
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

module.exports.updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted hotel")
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.getAllHotels = async (req, res) => {
    try {
        const hotel = await Hotel.find()
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.countByCity = async (req, res) => {
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

module.exports.countByType = async (req, res) => {
    try {
        const hotel = await Hotel.find()
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
}
