import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Delivery from "../models/Delivery.js";

// @desc    Admin dashboard metrics
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
export const getAdminDashboard = async (req, res, next) => {
  try {
    const [
      totalUsers,
      activeUsers,
      pendingUsers,
      blockedUsers,
      totalProducts,
      totalOrders,
      totalDeliveries,
      recentOrders,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: "Active" }),
      User.countDocuments({ status: "Pending" }),
      User.countDocuments({ status: "Blocked" }),
      Product.countDocuments(),
      Order.countDocuments(),
      Delivery.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5),
      User.find().sort({ createdAt: -1 }).limit(5).select("-password"),
    ]);

    // Calculate revenue
    const allOrders = await Order.find({ status: { $ne: "Cancelled" } });
    const totalRevenue = allOrders.reduce((acc, o) => acc + (o.total || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        pendingUsers,
        blockedUsers,
        totalProducts,
        totalOrders,
        totalDeliveries,
        totalRevenue,
      },
      recentOrders,
      recentUsers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users with filters
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const { search, role, status } = req.query;
    const query = {};

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { name: { $regex: term, $options: "i" } },
        { email: { $regex: term, $options: "i" } },
        { phone: { $regex: term, $options: "i" } },
        { location: { $regex: term, $options: "i" } },
      ];
    }

    if (role && role !== "All") {
      query.roles = { $in: [role.toLowerCase()] };
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    const formattedUsers = users.map((u) => {
      const safe = u.toSafeObject();
      return {
        id: safe._id.toString(),
        _id: safe._id.toString(),
        name: safe.name,
        email: safe.email,
        phone: safe.phone || safe.profile?.phone || "N/A",
        role: (safe.roles || [])[0]
          ? safe.roles[0].charAt(0).toUpperCase() + safe.roles[0].slice(1)
          : "Buyer",
        roles: safe.roles,
        location: safe.location || safe.profile?.location || "Addis Ababa",
        status: safe.status || "Active",
        createdAt: safe.createdAt,
      };
    });

    res.status(200).json({
      success: true,
      count: formattedUsers.length,
      users: formattedUsers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user details
// @route   GET /api/admin/users/:id
// @access  Private (Admin)
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user status / roles
// @route   PATCH /api/admin/users/:id
// @access  Private (Admin)
export const updateUser = async (req, res, next) => {
  try {
    const { status, roles, name, phone, location } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (status && ["Active", "Pending", "Blocked"].includes(status)) {
      user.status = status;
    }
    if (roles && Array.isArray(roles)) {
      user.roles = roles.map((r) => r.toLowerCase().trim());
    }
    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (location !== undefined) user.location = location.trim();

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `User "${user.name}" has been deleted.`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products for admin
// @route   GET /api/admin/products
// @access  Private (Admin)
export const getAllProducts = async (req, res, next) => {
  try {
    const { search, category, status } = req.query;
    const query = {};

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { name: { $regex: term, $options: "i" } },
        { category: { $regex: term, $options: "i" } },
        { location: { $regex: term, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = { $regex: new RegExp(`^${category.trim()}$`, "i") };
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const products = await Product.find(query)
      .populate("seller", "name email phone location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product status / approval
// @route   PATCH /api/admin/products/:id
// @access  Private (Admin)
export const adminUpdateProduct = async (req, res, next) => {
  try {
    const { isApproved, status, price, stock } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (isApproved !== undefined) product.isApproved = Boolean(isApproved);
    if (status) product.status = status;
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated by admin.",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin delete any product
// @route   DELETE /api/admin/products/:id
// @access  Private (Admin)
export const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Product "${product.name}" deleted by admin.`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all platform orders for admin
// @route   GET /api/admin/orders
// @access  Private (Admin)
export const getAllOrders = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const query = {};

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { orderNumber: { $regex: term, $options: "i" } },
        { "customer.fullName": { $regex: term, $options: "i" } },
        { "customer.phone": { $regex: term, $options: "i" } },
        { "customer.city": { $regex: term, $options: "i" } },
      ];
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("buyer", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};