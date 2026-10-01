export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated.",
      });
    }

    const userRoles = (req.user.roles || []).map((r) => String(r).toLowerCase());
    const normalizedAllowed = allowedRoles.map((r) => String(r).toLowerCase());

    // Normalize transport/transporter synonyms
    if (normalizedAllowed.includes("transport") && !normalizedAllowed.includes("transporter")) {
      normalizedAllowed.push("transporter");
    }
    if (normalizedAllowed.includes("transporter") && !normalizedAllowed.includes("transport")) {
      normalizedAllowed.push("transport");
    }

    // Admin always has access to everything
    if (userRoles.includes("admin")) {
      return next();
    }

    const hasPermission = userRoles.some((role) =>
      normalizedAllowed.includes(role)
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Requires one of [${allowedRoles.join(", ")}] roles.`,
      });
    }

    next();
  };
};