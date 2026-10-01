import User from "../models/User.js";

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      profile: {
        ...user.profile,
        name: user.name,
        email: user.email,
        phone: user.phone || user.profile?.phone || "",
        location: user.location || user.profile?.location || "",
        avatar: user.avatar || "",
        roles: user.roles,
      },
      user: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const {
      name,
      phone,
      location,
      bio,
      farmName,
      farmType,
      farmLocation,
      farmingExperience,
      businessName,
      businessType,
      businessLocation,
      businessDescription,
      vehicleType,
      vehiclePlate,
      serviceArea,
      deliveryAddress,
      avatar,
    } = req.body;

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (location !== undefined) user.location = location.trim();
    if (avatar !== undefined) user.avatar = avatar;

    // Update nested profile
    user.profile = {
      ...(user.profile || {}),
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      bio: bio !== undefined ? bio : user.profile?.bio || "",
      farmName: farmName !== undefined ? farmName : user.profile?.farmName || "",
      farmType: farmType !== undefined ? farmType : user.profile?.farmType || "",
      farmLocation: farmLocation !== undefined ? farmLocation : user.profile?.farmLocation || "",
      farmingExperience: farmingExperience !== undefined ? farmingExperience : user.profile?.farmingExperience || "",
      businessName: businessName !== undefined ? businessName : user.profile?.businessName || "",
      businessType: businessType !== undefined ? businessType : user.profile?.businessType || "",
      businessLocation: businessLocation !== undefined ? businessLocation : user.profile?.businessLocation || "",
      businessDescription: businessDescription !== undefined ? businessDescription : user.profile?.businessDescription || "",
      vehicleType: vehicleType !== undefined ? vehicleType : user.profile?.vehicleType || "",
      vehiclePlate: vehiclePlate !== undefined ? vehiclePlate : user.profile?.vehiclePlate || "",
      serviceArea: serviceArea !== undefined ? serviceArea : user.profile?.serviceArea || "",
      deliveryAddress: deliveryAddress !== undefined ? deliveryAddress : user.profile?.deliveryAddress || "",
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: user.toSafeObject(),
      profile: user.profile,
    });
  } catch (error) {
    next(error);
  }
};