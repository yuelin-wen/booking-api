const express = require('express');
const router = express.Router();

const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } = require("../controller/Room");
const { verifyAdmin } = require('../utils/verifyToken');

// C
router.post("/:hotelid",verifyAdmin, createRoom)
// U
router.put("/:id",verifyAdmin, updateRoom)
// D
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)
// GET
router.get("/:id", getRoom)
// GET ALL
router.get("/", getAllRooms)

module.exports = router;
