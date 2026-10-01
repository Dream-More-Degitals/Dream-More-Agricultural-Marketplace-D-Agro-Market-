import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getPreferences,
  updatePreferences,
} from "../controllers/notificationController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/")
  .get(getNotifications);

router.patch("/read-all", markAllAsRead);

router.route("/preferences")
  .get(getPreferences)
  .put(updatePreferences);

router.route("/:id")
  .delete(deleteNotification);

router.patch("/:id/read", markAsRead);

export default router;