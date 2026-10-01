import Order from "../models/Order.js";
import { processNewOrder } from "../services/orderService.js";
import { createNotification } from "../services/notificationService.js";

// @desc    Create new order (Authoritative checkout)
// @route   POST /api/orders
// @access  Private (Buyer)
export const createOrder = async (req, res, next) => {
  try {
    const { customer, deliveryMethod, paymentMethod, items } = req.body;

    if (
      !customer ||
      !customer.fullName ||
      !customer.phone ||
      !customer.region ||
      !customer.city ||
      !customer.address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all delivery address fields.",
      });
    }

    const order = await processNewOrder({
      buyerId: req.user._id,
      customer,
      deliveryMethod,
      paymentMethod,
      itemsInput: items,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in buyer's orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order details
// @route   GET /api/orders/:id
// @access  Private (Buyer, Seller of item, Transporter, Admin)
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderNumber: id }],
    }).populate("buyer", "name email phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Authorization
    const userId = req.user._id.toString();
    const isBuyer = order.buyer._id ? order.buyer._id.toString() === userId : order.buyer.toString() === userId;
    const isSeller = order.items.some(
      (item) => item.seller && item.seller.toString() === userId
    );
    const userRoles = (req.user.roles || []).map((r) => r.toLowerCase());
    const isPrivileged = userRoles.includes("admin") || userRoles.includes("transporter");

    if (!isBuyer && !isSeller && !isPrivileged) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to view this order.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
// @access  Private (Authorized Seller, Transporter, Admin)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const validStatuses = [
      "Processing",
      "Confirmed",
      "Preparing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed statuses: ${validStatuses.join(", ")}`,
      });
    }

    const order = await Order.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderNumber: id }],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Role check
    const userId = req.user._id.toString();
    const isSeller = order.items.some(
      (item) => item.seller && item.seller.toString() === userId
    );
    const userRoles = (req.user.roles || []).map((r) => r.toLowerCase());
    const isAuthorized = isSeller || userRoles.includes("admin") || userRoles.includes("transporter");

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have permission to update this order status.",
      });
    }

    order.status = status;
    order.statusHistory.push({
      status,
      changedAt: new Date(),
      changedBy: req.user._id,
      note: note || `Status updated to ${status}`,
    });

    await order.save();

    // Send notification to buyer
    await createNotification({
      userId: order.buyer,
      title: `Order Status: ${status}`,
      message: `Your order ${order.orderNumber} is now ${status}.`,
      type: "order",
      link: `/buyer/orders`,
    });

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}.`,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders relevant to authenticated Farmer
// @route   GET /api/farmer/orders
// @access  Private (Farmer, Admin)
export const getFarmerOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find orders that contain at least one item belonging to this farmer
    const orders = await Order.find({
      "items.seller": userId,
    }).sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => {
      const farmerItems = order.items.filter(
        (i) => i.seller.toString() === userId.toString()
      );
      const farmerSubtotal = farmerItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );
      return {
        ...order.toObject(),
        farmerItems,
        farmerSubtotal,
      };
    });

    res.status(200).json({
      success: true,
      count: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders relevant to authenticated Supplier
// @route   GET /api/supplier/orders
// @access  Private (Supplier, Admin)
export const getSupplierOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({
      "items.seller": userId,
    }).sort({ createdAt: -1 });

    const formattedOrders = orders.map((order) => {
      const supplierItems = order.items.filter(
        (i) => i.seller.toString() === userId.toString()
      );
      const supplierSubtotal = supplierItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );
      return {
        ...order.toObject(),
        supplierItems,
        supplierSubtotal,
      };
    });

    res.status(200).json({
      success: true,
      count: formattedOrders.length,
      orders: formattedOrders,
    });
  } catch (error) {
    next(error);
  }
};