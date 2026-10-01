import express from "express";
import {
  getProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/seller/my-products", authenticateUser, authorizeRoles("farmer", "supplier", "admin"), getMyProducts);
router.get("/:id", getProductById);

// Protected routes (Seller / Admin)
router.post(
  "/",
  authenticateUser,
  authorizeRoles("farmer", "supplier", "admin"),
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("farmer", "supplier", "admin"),
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("farmer", "supplier", "admin"),
  deleteProduct
);

export default router;