const express = require('express');
const router = express.Router();
const { updateUser, deleteUser, getUser, getAllUsers } = require("../controller/user");
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

// check authentication
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you are logged in and you can delete all account")
// })

// U
router.put("/:id", verifyUser, updateUser)
// D
router.delete("/:id", verifyUser, deleteUser)
// GET
router.get("/:id", verifyUser, getUser)
// GET ALL
router.get("/", verifyAdmin, getAllUsers)

module.exports = router;
