import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    roles: {
      type: [String],
      required: true,
      default: ["buyer"],
      validate: {
        validator: function (roles) {
          const validRoles = ["farmer", "buyer", "supplier", "transporter", "transport", "admin"];
          return Array.isArray(roles) && roles.length > 0 && roles.every((r) => validRoles.includes(r.toLowerCase()));
        },
        message: "Invalid role specified. Valid roles are: farmer, buyer, supplier, transporter, admin",
      },
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Blocked"],
      default: "Active",
    },
    profile: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      bio: { type: String, default: "" },
      farmName: { type: String, default: "" },
      farmType: { type: String, default: "" },
      farmLocation: { type: String, default: "" },
      farmingExperience: { type: String, default: "" },
      businessName: { type: String, default: "" },
      businessType: { type: String, default: "" },
      businessLocation: { type: String, default: "" },
      businessDescription: { type: String, default: "" },
      vehicleType: { type: String, default: "" },
      vehiclePlate: { type: String, default: "" },
      serviceArea: { type: String, default: "" },
      deliveryAddress: { type: String, default: "" },
      preferences: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    notificationPreferences: {
      orderUpdates: { type: Boolean, default: true },
      priceAlerts: { type: Boolean, default: true },
      aiInsights: { type: Boolean, default: false },
      promotionalOffers: { type: Boolean, default: false },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Pre-save hook: Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with stored hash
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Format user for safe API output (never leak password)
userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpire;
  return obj;
};

const User = mongoose.model("User", userSchema);
export default User;