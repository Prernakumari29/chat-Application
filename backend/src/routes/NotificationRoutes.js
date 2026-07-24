const express = require("express");
const { fetchNotification, markAsRead } = require("../controller/NotificationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/notification" , authMiddleware, fetchNotification)
router.put("/notification/read/:chatId" ,authMiddleware , markAsRead)


module.exports = router