import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    unit: {
      type: String,
      default: "kg",
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    image: {
      type: String,
      default: "/images/product-placeholder.jpg",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller reference is required"],
      index: true,
    },
    sellerType: {
      type: String,
      enum: ["Farmer", "Supplier", "farmer", "supplier", "Admin", "admin"],
      required: [true, "Seller type is required"],
      default: "Farmer",
    },
    sellerName: {
      type: String,
      default: "",
    },
    badge: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Available", "Low Stock", "Out of Stock"],
      default: "Available",
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save hook: compute slug and status based on stock
productSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.slug =
      this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      randomSuffix;
  }

  // Update status based on stock level
  if (this.stock <= 0) {
    this.status = "Out of Stock";
  } else if (this.stock <= 50) {
    this.status = "Low Stock";
  } else {
    this.status = "Available";
  }

  next();
});

// Text index for search
productSchema.index({ name: "text", category: "text", location: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);
export default Product;