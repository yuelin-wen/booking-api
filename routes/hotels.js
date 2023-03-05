const express = require('express');
const router = express.Router();
const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels } = require("../controller/hotel");
const { verifyAdmin } = require('../utils/verifyToken');

// C
router.post("/",verifyAdmin, createHotel)
// U
router.put("/:id",verifyAdmin, updateHotel)
// D
router.delete("/:id",verifyAdmin, deleteHotel)
// GET
router.get("/:id", getHotel)
// GET ALL
router.get("/", getAllHotels)

module.exports = router;
