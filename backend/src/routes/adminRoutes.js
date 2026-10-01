import express from "express";
import {
  getAdminDashboard,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllProducts,
  adminUpdateProduct,
  adminDeleteProduct,
  getAllOrders,
} from "../controllers/adminController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protect ALL admin routes with authenticateUser + authorizeRoles("admin")
router.use(authenticateUser, authorizeRoles("admin"));

router.get("/dashboard", getAdminDashboard);

// User management
router.route("/users")
  .get(getAllUsers);

router.route("/users/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

// Product management
router.route("/products")
  .get(getAllProducts);

router.route("/products/:id")
  .patch(adminUpdateProduct)
  .delete(adminDeleteProduct);

// Orders
router.get("/orders", getAllOrders);

export default router;