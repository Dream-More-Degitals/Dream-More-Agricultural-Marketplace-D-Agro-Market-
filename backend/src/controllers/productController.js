import mongoose from "mongoose";
import Product from "../models/Product.js";

// @desc    Get all products with search, filter, pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      sellerType,
      location,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // Only show approved products for public marketplace
    query.isApproved = true;

    // Search query
    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { name: { $regex: term, $options: "i" } },
        { location: { $regex: term, $options: "i" } },
        { category: { $regex: term, $options: "i" } },
        { description: { $regex: term, $options: "i" } },
      ];
    }

    // Category filter (ignore 'All' or 'All Products')
    if (
      category &&
      category !== "All" &&
      category !== "All Products" &&
      category.trim()
    ) {
      query.category = { $regex: new RegExp(`^${category.trim()}$`, "i") };
    }

    // Seller type filter
    if (sellerType && sellerType !== "All") {
      query.sellerType = { $regex: new RegExp(`^${sellerType.trim()}$`, "i") };
    }

    // Location filter
    if (location && location.trim()) {
      query.location = { $regex: location.trim(), $options: "i" };
    }

    // Price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined && !isNaN(Number(minPrice))) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !isNaN(Number(maxPrice))) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "name-asc") sortOption = { name: 1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("seller", "name email phone location")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID or Slug
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let product;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id).populate("seller", "name email phone location avatar");
    }

    // Fallback: search by slug or custom id string
    if (!product) {
      product = await Product.findOne({
        $or: [{ slug: id }, { slug: id.toLowerCase() }],
      }).populate("seller", "name email phone location avatar");
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products owned by authenticated seller (Farmer or Supplier)
// @route   GET /api/products/seller/my-products
// @access  Private (Farmer, Supplier, Admin)
export const getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Farmer, Supplier, Admin)
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      description,
      price,
      stock,
      unit,
      location,
      image,
      sellerType,
    } = req.body;

    if (!name || !category || price === undefined || stock === undefined || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide product name, category, price, stock, and location.",
      });
    }

    // Authoritative seller assignment: ALWAYS use req.user._id
    const seller = req.user._id;
    const sellerName = req.user.name;

    // Determine seller type
    let determinedSellerType = "Farmer";
    const userRoles = (req.user.roles || []).map((r) => r.toLowerCase());

    if (sellerType && ["farmer", "supplier"].includes(sellerType.toLowerCase())) {
      determinedSellerType = sellerType.toLowerCase() === "supplier" ? "Supplier" : "Farmer";
    } else if (userRoles.includes("supplier") && !userRoles.includes("farmer")) {
      determinedSellerType = "Supplier";
    }

    // Image: handle uploaded file if present, or passed url/base64
    let productImage = "/images/product-placeholder.jpg";
    if (req.file) {
      productImage = `/uploads/${req.file.filename}`;
    } else if (image && image.trim()) {
      productImage = image.trim();
    }

    const product = await Product.create({
      name: name.trim(),
      category: category.trim(),
      description: (description || "").trim(),
      price: Number(price),
      stock: Number(stock),
      unit: unit || "kg",
      location: location.trim(),
      image: productImage,
      seller,
      sellerType: determinedSellerType,
      sellerName,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product (Ownership enforced)
// @route   PUT /api/products/:id
// @access  Private (Owner Farmer/Supplier, or Admin)
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Ownership check: must be owner or admin
    const isOwner = product.seller.toString() === req.user._id.toString();
    const isAdmin = (req.user.roles || []).some(
      (r) => String(r).toLowerCase() === "admin"
    );

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to update another seller's product.",
      });
    }

    const {
      name,
      category,
      description,
      price,
      stock,
      unit,
      location,
      image,
      badge,
    } = req.body;

    if (name) product.name = name.trim();
    if (category) product.category = category.trim();
    if (description !== undefined) product.description = description.trim();
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);
    if (unit) product.unit = unit;
    if (location) product.location = location.trim();
    if (badge !== undefined) product.badge = badge;

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    } else if (image !== undefined && image.trim()) {
      product.image = image.trim();
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product (Ownership enforced)
// @route   DELETE /api/products/:id
// @access  Private (Owner Farmer/Supplier, or Admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Ownership check
    const isOwner = product.seller.toString() === req.user._id.toString();
    const isAdmin = (req.user.roles || []).some(
      (r) => String(r).toLowerCase() === "admin"
    );

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You are not authorized to delete another seller's product.",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Product "${product.name}" has been deleted.`,
    });
  } catch (error) {
    next(error);
  }
};