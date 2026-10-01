import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getFarmerOrders,
  getSupplierOrders,
} from "../controllers/orderController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(authenticateUser);

router.post("/", createOrder);
router.get("/my-orders", getMyOrders);
router.get("/farmer", authorizeRoles("farmer", "admin"), getFarmerOrders);
router.get("/supplier", authorizeRoles("supplier", "admin"), getSupplierOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);

export default router;