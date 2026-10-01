import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const createNotification = async ({
  userId,
  title,
  message,
  type = "system",
  link = "",
}) => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;

    // Respect user notification preferences
    const prefs = user.notificationPreferences || {};
    if (type === "order" && prefs.orderUpdates === false) return null;
    if (type === "price" && prefs.priceAlerts === false) return null;
    if (type === "ai" && prefs.aiInsights === false) return null;
    if (type === "promotion" && prefs.promotionalOffers === false) return null;

    const notification = await Notification.create({
      user: userId,
      title,
      message,
      type,
      link,
    });

    return notification;
  } catch (error) {
    console.error("[Notification Service Error]", error.message);
    return null;
  }
};