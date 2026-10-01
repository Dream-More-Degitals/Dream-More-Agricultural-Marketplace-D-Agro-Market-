import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unit: {
      type: String,
      default: "kg",
    },
    image: {
      type: String,
      default: "/images/product-placeholder.jpg",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerType: {
      type: String,
      enum: ["Farmer", "Supplier", "farmer", "supplier", "Admin", "admin"],
      required: true,
    },
    sellerName: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
    },
  },
  { _id: true }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Order must contain at least one item",
      },
    },
    customer: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      region: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    deliveryMethod: {
      type: String,
      enum: ["standard", "express", "Standard", "Express"],
      default: "standard",
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 150,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "telebirr", "Cash on Delivery", "Telebirr"],
      default: "cash",
    },
    status: {
      type: String,
      enum: [
        "Processing",
        "Confirmed",
        "Preparing",
        "Shipped",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Processing",
      index: true,
    },
    statusHistory: [
      {
        status: { type: String, required: true },
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        note: { type: String, default: "" },
      },
    ],
    date: {
      type: String,
      default: () => new Date().toLocaleDateString(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret.orderNumber || ret._id.toString();
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;