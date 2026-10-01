export const analyzeCropDisease = ({
  filename = "uploaded_leaf.jpg",
  fileUrl = "",
  cropType = "General Crop",
}) => {
  // Demonstration rule-based response clearly marked
  const detections = [
    {
      disease: "Healthy / Minor Leaf Stress",
      confidence: 89,
      severity: "Low",
      symptoms: "Slight discoloration along leaf tips, likely due to transient moisture variance.",
      advice: "Maintain regular irrigation schedules. Avoid excessive nitrogen fertilizer. Inspect again in 7 days.",
      chemicalControl: "None required. Organic compost enrichment recommended.",
    },
    {
      disease: "Early Leaf Blight (Alternaria)",
      confidence: 84,
      severity: "Moderate",
      symptoms: "Concentric brown spots with yellow halos on lower foliage.",
      advice: "Remove and destroy infected lower leaves. Ensure good plant spacing for air circulation.",
      chemicalControl: "Apply copper-based fungicide or Mancozeb as per Ministry of Agriculture guidelines.",
    },
  ];

  // Pick deterministic detection based on filename or default to first
  const selected = detections[0];

  return {
    success: true,
    result: {
      ...selected,
      analyzedImage: fileUrl || `/uploads/${filename}`,
      cropType,
      modelType: "Computer Vision Demonstration Service",
      isDemoRuleBased: true,
      note: "Demonstration image analysis service. Prepared for connection to a trained PyTorch/TensorFlow plant pathology model.",
    },
  };
};