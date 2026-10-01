import Delivery from "../models/Delivery.js";
import Order from "../models/Order.js";
import { createNotification } from "../services/notificationService.js";

// @desc    Get deliveries (Transporters see assigned/available; Admin sees all)
// @route   GET /api/deliveries
// @access  Private (Transporter, Admin)
export const getDeliveries = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const userRoles = (req.user.roles || []).map((r) => r.toLowerCase());
    const isAdmin = userRoles.includes("admin");

    const query = {};

    if (!isAdmin) {
      // Transporter sees deliveries assigned to them or unassigned/ready
      query.$or = [
        { transportProvider: req.user._id },
        { transportProvider: null },
      ];
    }

    if (status && status !== "All") {
      query.status = status;
    }

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { deliveryId: { $regex: term, $options: "i" } },
        { orderId: { $regex: term, $options: "i" } },
        { customer: { $regex: term, $options: "i" } },
        { pickup: { $regex: term, $options: "i" } },
        { destination: { $regex: term, $options: "i" } },
        { product: { $regex: term, $options: "i" } },
      ];
    }

    const deliveries = await Delivery.find(query)
      .populate("transportProvider", "name phone email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: deliveries.length,
      deliveries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single delivery by ID
// @route   GET /api/deliveries/:id
// @access  Private
export const getDeliveryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { deliveryId: id }],
    }).populate("transportProvider", "name phone email vehicleType");

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    res.status(200).json({
      success: true,
      delivery,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new delivery record
// @route   POST /api/deliveries
// @access  Private (Admin, Transporter)
export const createDelivery = async (req, res, next) => {
  try {
    const {
      orderId,
      customer,
      phone,
      pickup,
      destination,
      product,
      quantity,
    } = req.body;

    const deliveryId = `DEL-${Date.now().toString().slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;

    const delivery = await Delivery.create({
      deliveryId,
      order: req.body.order || new mongoose.Types.ObjectId(),
      orderId: orderId || "ORD-MANUAL",
      customer: customer || "Valued Buyer",
      phone: phone || "0911000000",
      pickup: pickup || "Addis Ababa",
      destination: destination || "Oromia",
      product: product || "Agricultural Products",
      quantity: quantity || 1,
      status: "Ready for Pickup",
    });

    res.status(201).json({
      success: true,
      message: "Delivery created successfully.",
      delivery,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update delivery details / assign transporter
// @route   PATCH /api/deliveries/:id
// @access  Private (Admin)
export const updateDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { transportProviderId, transporterName, status, pickup, destination } = req.body;

    const delivery = await Delivery.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { deliveryId: id }],
    });

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    if (transportProviderId) {
      delivery.transportProvider = transportProviderId;
    }
    if (transporterName) {
      delivery.transporter = transporterName;
    }
    if (status) {
      delivery.status = status;
    }
    if (pickup) {
      delivery.pickup = pickup;
    }
    if (destination) {
      delivery.destination = destination;
    }

    await delivery.save();

    res.status(200).json({
      success: true,
      message: "Delivery details updated.",
      delivery,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update delivery status
// @route   PATCH /api/deliveries/:id/status
// @access  Private (Transporter, Admin)
export const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Ready for Pickup",
      "Accepted",
      "Picked Up",
      "In Transit",
      "Delivered",
      "Completed",
      "Cancelled",
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid delivery status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const delivery = await Delivery.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { deliveryId: id }],
    });

    if (!delivery) {
      return res.status(404).json({
        success: false,
        message: "Delivery not found.",
      });
    }

    // Assign transporter to delivery if accepted and not yet assigned
    if (!delivery.transportProvider && req.user) {
      delivery.transportProvider = req.user._id;
      delivery.transporter = req.user.name;
    }

    delivery.status = status;
    await delivery.save();

    // Sync order status if relevant
    if (delivery.order) {
      const order = await Order.findById(delivery.order);
      if (order) {
        if (status === "In Transit" || status === "Picked Up") {
          order.status = "In Transit";
        } else if (status === "Delivered" || status === "Completed") {
          order.status = "Delivered";
        }
        await order.save();

        // Notify buyer
        await createNotification({
          userId: order.buyer,
          title: `Delivery Update: ${status}`,
          message: `Your delivery for order ${order.orderNumber} is now ${status}.`,
          type: "delivery",
          link: `/buyer/orders`,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Delivery status updated to ${status}.`,
      delivery,
    });
  } catch (error) {
    next(error);
  }
};