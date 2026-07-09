const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { accessChat, fetchChat, groupChatController } = require("../controller/chatController");
const { rename } = require("../controller/authController");
const router = express.Router();


router.post("/chat" , authMiddleware , accessChat);
router.get("/fetch-chat" , authMiddleware , fetchChat);
router.post("/createGroup" , authMiddleware , groupChatController);
router.put("/rename" , authMiddleware, rename);


module.exports = router;