import express from "express";
import {
  getDeliveries,
  getDeliveryById,
  createDelivery,
  updateDelivery,
  updateDeliveryStatus,
} from "../controllers/deliveryController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/")
  .get(authorizeRoles("transporter", "transport", "admin"), getDeliveries)
  .post(authorizeRoles("admin", "transporter", "transport"), createDelivery);

router.route("/:id")
  .get(getDeliveryById)
  .patch(authorizeRoles("admin"), updateDelivery);

router.patch(
  "/:id/status",
  authorizeRoles("transporter", "transport", "admin"),
  updateDeliveryStatus
);

export default router;