import Notification from "../models/Notification.js";
import User from "../models/User.js";

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    res.status(200).json({
      success: true,
      unreadCount,
      notifications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark single notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { $set: { read: true } },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all user notifications as read
// @route   PATCH /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read.",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete single notification
// @route   DELETE /api/notifications/:id
// @access  Private
export const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Notification.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted.",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get notification preferences
// @route   GET /api/notifications/preferences
// @access  Private
export const getPreferences = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      preferences: user?.notificationPreferences || {
        orderUpdates: true,
        priceAlerts: true,
        aiInsights: false,
        promotionalOffers: false,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update notification preferences
// @route   PUT /api/notifications/preferences
// @access  Private
export const updatePreferences = async (req, res, next) => {
  try {
    const { orderUpdates, priceAlerts, aiInsights, promotionalOffers } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.notificationPreferences = {
      orderUpdates: orderUpdates !== undefined ? Boolean(orderUpdates) : user.notificationPreferences?.orderUpdates,
      priceAlerts: priceAlerts !== undefined ? Boolean(priceAlerts) : user.notificationPreferences?.priceAlerts,
      aiInsights: aiInsights !== undefined ? Boolean(aiInsights) : user.notificationPreferences?.aiInsights,
      promotionalOffers: promotionalOffers !== undefined ? Boolean(promotionalOffers) : user.notificationPreferences?.promotionalOffers,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Notification preferences updated.",
      preferences: user.notificationPreferences,
    });
  } catch (error) {
    next(error);
  }
};