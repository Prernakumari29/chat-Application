const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { accessChat, fetchChat, groupChatController } = require("../controller/chatController");
const router = express.Router();


router.post("/chat" , authMiddleware , accessChat);
router.get("/fetch-chat" , authMiddleware , fetchChat)
router.post("/createGroup" , authMiddleware , groupChatController)


module.exports = router;