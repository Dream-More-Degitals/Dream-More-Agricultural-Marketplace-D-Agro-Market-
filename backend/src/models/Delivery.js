import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    deliveryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    orderId: {
      type: String,
      default: function () {
        return this.orderNumber || "";
      },
    },
    orderNumber: {
      type: String,
      default: function () {
        return this.orderId || "";
      },
    },
    transportProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      default: null,
    },
    transporter: {
      type: String,
      default: "Unassigned",
    },
    customer: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    pickup: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString(),
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Ready for Pickup",
        "Accepted",
        "Picked Up",
        "In Transit",
        "Delivered",
        "Completed",
        "Cancelled",
      ],
      default: "Ready for Pickup",
      index: true,
    },
    estimatedDelivery: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret.deliveryId || ret._id.toString();
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

const Delivery = mongoose.model("Delivery", deliverySchema);
export default Delivery;