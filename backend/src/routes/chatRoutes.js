const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { accessChat, fetchChat, groupChatController, addToGroup, rename, removeFromGroup, removeChat, leaveGroup } = require("../controller/chatController");
const router = express.Router();


router.post("/chat" , authMiddleware , accessChat);
router.get("/fetch-chat" , authMiddleware , fetchChat);
router.post("/createGroup" , authMiddleware , groupChatController);
router.put("/rename" , authMiddleware, rename );
router.put("/groupAdd" , authMiddleware, addToGroup);
router.put("/removeGroup" , authMiddleware , removeFromGroup)
router.put("/removeChat/:chatId" , authMiddleware , removeChat )
router.put("/leaveGroup" , authMiddleware ,leaveGroup)


module.exports = router;