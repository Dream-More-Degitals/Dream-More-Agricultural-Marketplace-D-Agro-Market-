import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload image (returns URL)
router.post("/", authenticateUser, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image file.",
    });
  }

  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({
    success: true,
    message: "Image uploaded successfully.",
    url,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

export default router;