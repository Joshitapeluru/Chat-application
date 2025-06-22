import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/messages/:conversationId", protectRoute, getMessages); // Good route
router.post("/send/:id", protectRoute, sendMessage);

export default router;
