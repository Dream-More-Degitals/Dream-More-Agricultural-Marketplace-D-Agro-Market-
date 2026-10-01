import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. No token provided.",
      });
    }

    const secret = process.env.JWT_SECRET || "dagro_jwt_secret_dev_key_2026_ethiopian_agro_market";
    const decoded = jwt.verify(token, secret);

    const user = await User.findById(decoded.id || decoded._id).select("+roles");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found. Invalid token.",
      });
    }

    if (user.status === "Blocked") {
      return res.status(403).json({
        success: false,
        message: "This account has been suspended. Please contact support.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token.",
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const secret = process.env.JWT_SECRET || "dagro_jwt_secret_dev_key_2026_ethiopian_agro_market";
      const decoded = jwt.verify(token, secret);
      const user = await User.findById(decoded.id || decoded._id);
      if (user && user.status !== "Blocked") {
        req.user = user;
      }
    }
    next();
  } catch {
    next();
  }
};