const express = require("express");
const { registerUser, loginUser, searchUserController, UpdateProfile, getCurrentUser, logout, getAccessToken } = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.get("/search-user" , authMiddleware , searchUserController )
router.patch("/update-profile" , authMiddleware , UpdateProfile )
router.get("/me" , authMiddleware , getCurrentUser)
router.post("/logout" , authMiddleware , logout)
router.get("/getAccessToken" , getAccessToken)


module.exports = router;