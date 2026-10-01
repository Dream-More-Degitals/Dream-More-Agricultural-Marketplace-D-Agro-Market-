import express from "express";
import {
  cropRecommendation,
  diseaseDetection,
  pricePrediction,
  aiAdvisor,
} from "../controllers/aiController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/crop-recommendation", cropRecommendation);
router.post("/disease-detection", upload.single("image"), diseaseDetection);
router.post("/price-prediction", pricePrediction);
router.post("/advisor", aiAdvisor);

export default router;