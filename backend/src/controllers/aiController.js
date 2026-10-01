import { getCropRecommendation } from "../services/ai/cropRecommendationService.js";
import { analyzeCropDisease } from "../services/ai/diseaseDetectionService.js";
import { calculatePricePrediction } from "../services/ai/pricePredictionService.js";
import { getAIAdvisorAnswer } from "../services/ai/aiAdvisorService.js";

// @desc    Crop Recommendation
// @route   POST /api/ai/crop-recommendation
// @access  Public
export const cropRecommendation = async (req, res, next) => {
  try {
    const { soil, rainfall, temperature, region, season } = req.body;

    const result = getCropRecommendation({
      soil,
      rainfall,
      temperature,
      region,
      season,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Crop Disease Detection
// @route   POST /api/ai/disease-detection
// @access  Public
export const diseaseDetection = async (req, res, next) => {
  try {
    let fileUrl = "";
    let filename = "";

    if (req.file) {
      filename = req.file.filename;
      fileUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      fileUrl = req.body.image;
      filename = "uploaded_leaf.jpg";
    }

    const result = analyzeCropDisease({
      filename,
      fileUrl,
      cropType: req.body.cropType || "General Crop",
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Agricultural Price Prediction
// @route   POST /api/ai/price-prediction
// @access  Public
export const pricePrediction = async (req, res, next) => {
  try {
    const { product, region, currentPrice, quantity } = req.body;

    if (!currentPrice || Number(currentPrice) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid current market price.",
      });
    }

    const result = calculatePricePrediction({
      product,
      region,
      currentPrice,
      quantity,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    AI Advisor Q&A
// @route   POST /api/ai/advisor
// @access  Public
export const aiAdvisor = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter your question for the AI Advisor.",
      });
    }

    const result = getAIAdvisorAnswer(message);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};