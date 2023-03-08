const express = require('express');
const router = express.Router();
const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, countByCity, countByType } = require("../controller/hotel");
const { verifyAdmin } = require('../utils/verifyToken');

// C
router.post("/", verifyAdmin, createHotel)
// U
router.put("/find/:id", verifyAdmin, updateHotel)
// D
router.delete("/find/:id", verifyAdmin, deleteHotel)
// GET
router.get("/find/:id", getHotel)
// GET ALL
router.get("/", getAllHotels)

router.get("/countByCity", countByCity)

router.get("/countByType", countByType)

module.exports = router;
