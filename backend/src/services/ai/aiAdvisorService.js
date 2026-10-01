export const getAIAdvisorAnswer = (userMessage) => {
  const text = String(userMessage || "").toLowerCase();

  let reply =
    "That is an important agricultural question. To give you the most accurate advice, please specify your crop, region, soil type, or current symptoms.";
  let suggestions = [
    "How can I improve maize production?",
    "Why are my crop leaves turning yellow?",
    "What are current teff price trends?",
    "How do I prevent coffee berry disease?",
  ];

  if (text.includes("maize") || text.includes("corn")) {
    reply =
      "Maize thrives in well-drained loamy soils with 600-1200mm rainfall. Key best practices: apply DAP/NPS at planting, top-dress with Urea at knee height (4-6 weeks), and scout weekly for Fall Armyworm on central whorls.";
    suggestions = [
      "How to control Fall Armyworm?",
      "Optimal spacing for maize planting",
      "Fertilizer requirements for maize per hectare",
    ];
  } else if (text.includes("teff")) {
    reply =
      "Teff requires a very firm, level seedbed. Sowing at 10-15 kg/ha in rows reduces lodging compared to traditional broadcasting. Weed early (within 2-3 weeks) to prevent competition.";
    suggestions = [
      "White Teff vs Brown Teff yield comparison",
      "Best herbicide for teff grass weeds",
      "Current teff market prices",
    ];
  } else if (text.includes("coffee")) {
    reply =
      "Arabica coffee requires partial shade (around 30-40% canopy), regular pruning of dead wood after harvest, and mulching to conserve root moisture during dry seasons.";
    suggestions = [
      "How to manage Coffee Berry Disease?",
      "Organic compost recipe for coffee plantations",
      "Grading standards for Yirgacheffe coffee",
    ];
  } else if (text.includes("yellow") || text.includes("leaf") || text.includes("disease")) {
    reply =
      "Yellowing leaves (chlorosis) often indicates nitrogen deficiency if it starts on older lower leaves, or iron/micronutrient deficiency if on newest leaves. Waterlogging can also choke root oxygen and turn leaves pale.";
    suggestions = [
      "Check Nitrogen deficiency symptoms",
      "Upload image to Disease Detection tool",
      "Organic remedies for fungal leaf spots",
    ];
  } else if (text.includes("price") || text.includes("market") || text.includes("sell")) {
    reply =
      "Market prices fluctuate based on seasonal harvest peaks and regional transportation costs. You can check the Price Prediction tool for commodity forecast estimates.";
    suggestions = [
      "Predict price for Sidama Coffee",
      "Predict price for Red Onions",
      "Current buyer demand trends",
    ];
  } else if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    reply = "Hello! 👋 I am your D-Agro Agricultural Advisor. How can I assist your farming or agricultural trading today?";
  }

  return {
    success: true,
    reply,
    suggestions,
    isDemoRuleBased: true,
    note: "Structured agricultural knowledge service. Designed for zero-downtime transition to OpenAI/Gemini/Claude LLM when API keys are configured.",
  };
};