export const getCropRecommendation = ({
  soil = "Loamy",
  rainfall = 800,
  temperature = 22,
  region = "Oromia",
  season = "Main Season",
}) => {
  const rain = Number(rainfall) || 0;
  const temp = Number(temperature) || 0;
  const soilType = String(soil).toLowerCase();
  const reg = String(region).toLowerCase();

  let crop = "Maize";
  let confidence = 88;
  let reason = "Maize performs well under moderate rainfall and warm temperatures in Ethiopian soil conditions.";
  let alternatives = ["Wheat", "Sorghum"];

  if (reg.includes("amhara") || temp <= 18 || rain >= 800) {
    if (rain >= 700 && temp <= 22) {
      crop = "White Teff (Magna)";
      confidence = 94;
      reason = "Highland loamy/black soil with moderate cool temperatures provides ideal conditions for premium teff.";
      alternatives = ["Barley", "Wheat", "Faba Bean"];
    } else {
      crop = "Wheat";
      confidence = 90;
      reason = "Moderate rainfall and temperature between 15-22°C are optimal for Ethiopian highland wheat cultivars.";
      alternatives = ["Teff", "Barley"];
    }
  } else if (reg.includes("snnp") || reg.includes("sidama") || (rain >= 1000 && temp >= 18 && temp <= 26)) {
    crop = "Arabica Coffee";
    confidence = 96;
    reason = "Rich volcanic soil, elevation, and high rainfall (1000-1400mm) offer world-class conditions for specialty coffee.";
    alternatives = ["Enset", "Spices (Cardamom)", "Avocado"];
  } else if (temp >= 24 && rain < 600) {
    crop = "Sorghum";
    confidence = 89;
    reason = "Drought-resilient and heat-tolerant, sorghum is well adapted to lower moisture and semi-arid regions.";
    alternatives = ["Millet", "Sesame"];
  } else if (soilType.includes("clay") || soilType.includes("black")) {
    crop = "Haricot Beans";
    confidence = 87;
    reason = "Clay-loam nutrient capacity supports high legume yield with natural nitrogen fixation.";
    alternatives = ["Chickpeas", "Lentils"];
  }

  return {
    success: true,
    recommendation: {
      crop,
      confidence,
      reason,
      alternatives,
      inputs: { soil, rainfall: rain, temperature: temp, region, season },
      modelType: "Rule-Based Agro-Ecological Advisory Engine",
      isDemoRuleBased: true,
      note: "Rule-based agricultural decision engine. Prepared for seamless drop-in of ML model trained on Ethiopian agro-data.",
    },
  };
};