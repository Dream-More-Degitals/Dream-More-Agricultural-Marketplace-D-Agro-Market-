import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || "dagro_jwt_secret_dev_key_2026_ethiopian_agro_market";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(
    { id: user._id, email: user.email, roles: user.roles },
    secret,
    { expiresIn }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, roles, profile, phone, location } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide full name, email, and password.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check duplicate
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email address already exists.",
      });
    }

    // Format roles (ensure lowercase strings)
    let userRoles = ["buyer"];
    if (Array.isArray(roles) && roles.length > 0) {
      userRoles = roles.map((r) => String(r).toLowerCase().trim());
    } else if (typeof roles === "string") {
      userRoles = [roles.toLowerCase().trim()];
    }

    const defaultProfile = {
      name: name.trim(),
      email: normalizedEmail,
      phone: phone || "",
      location: location || "",
      bio: "",
      farmName: "",
      farmType: "",
      businessName: "",
      businessType: "",
      vehicleType: "",
      ...(profile || {}),
    };

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      roles: userRoles,
      phone: phone || "",
      location: location || "",
      profile: defaultProfile,
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      token,
      user: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email and password.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Must explicitly select password because schema has select: false
    const user = await User.findOne({ email: normalizedEmail }).select("+password +roles");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (user.status === "Blocked") {
      return res.status(403).json({
        success: false,
        message: "This account has been suspended. Please contact platform support.",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
      user: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Private (JWT)
export const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout (stateless JWT acknowledgment)
// @route   POST /api/auth/logout
// @access  Public
export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email address.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // For security reasons, don't reveal if user does not exist
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If an account exists with that email, password reset instructions have been sent.",
      });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save({ validateBeforeSave: false });

    console.log(`[Dev Password Reset] Token for ${user.email}: ${resetToken}`);

    res.status(200).json({
      success: true,
      message: "If an account exists with that email, password reset instructions have been sent.",
      ...(process.env.NODE_ENV !== "production" && { devResetToken: resetToken }),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide reset token and new password.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token.",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};