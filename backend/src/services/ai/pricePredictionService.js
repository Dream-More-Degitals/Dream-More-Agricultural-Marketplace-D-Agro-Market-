export const calculatePricePrediction = ({
  product = "Maize",
  region = "Oromia",
  currentPrice = 180,
  quantity = 100,
}) => {
  const price = Number(currentPrice) || 100;
  const prod = String(product).toLowerCase();

  let changePercent = 8;
  let trend = "upward";
  let factor = "Seasonal demand and regional transport logistics";

  if (prod.includes("coffee")) {
    changePercent = 12;
    trend = "upward";
    factor = "High export auction premiums and international green bean demand";
  } else if (prod.includes("teff")) {
    changePercent = 10;
    trend = "upward";
    factor = "Urban wholesale market demand outstripping regional weekly supply";
  } else if (prod.includes("onion")) {
    changePercent = -5;
    trend = "downward";
    factor = "Recent harvest arrival in central Rift Valley markets increasing spot supply";
  } else if (prod.includes("wheat")) {
    changePercent = 6;
    trend = "upward";
    factor = "Commercial flour mill procurement and seasonal buffer restocking";
  }

  const predictedPrice = Math.round(price + (price * changePercent) / 100);

  return {
    success: true,
    prediction: {
      product,
      region,
      currentPrice: price,
      predictedPrice,
      changePercent,
      trend,
      marketDriver: factor,
      forecastPeriod: "Next 30 Days",
      isDemoRuleBased: true,
      modelType: "Market Trend Forecast Engine",
      note: "Algorithmic market trend calculation. Prepared for connection to ECX (Ethiopian Commodity Exchange) live data feed.",
    },
  };
};