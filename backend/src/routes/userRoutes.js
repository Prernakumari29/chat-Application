const express = require("express");
const { registerUser, loginUser, searchUserController } = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.get("/search-user" , authMiddleware , searchUserController )


module.exports = router;