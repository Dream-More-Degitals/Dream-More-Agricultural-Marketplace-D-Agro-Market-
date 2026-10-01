import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const formatCartResponse = (cart) => {
  let subtotal = 0;
  const items = [];

  for (const item of cart.items) {
    if (!item.product) continue;

    const prod = item.product;
    const price = Number(prod.price) || 0;
    const quantity = Number(item.quantity) || 1;
    const itemTotal = price * quantity;
    subtotal += itemTotal;

    items.push({
      id: prod._id.toString(),
      _id: prod._id.toString(),
      slug: prod.slug,
      name: prod.name,
      title: prod.name,
      category: prod.category,
      price: price,
      quantity: quantity,
      stock: prod.stock,
      unit: prod.unit || "kg",
      image: prod.image || "/images/product-placeholder.jpg",
      seller: prod.sellerName || "Farmer",
      sellerId: prod.seller?.toString(),
      sellerType: prod.sellerType,
      itemTotal,
      isAvailable: prod.stock >= quantity,
    });
  }

  const deliveryFee = items.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  return {
    items,
    totalItems: items.reduce((acc, i) => acc + i.quantity, 0),
    subtotal,
    deliveryFee,
    total,
  };
};

// @desc    Get current user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.status(200).json({
      success: true,
      cart: formatCartResponse(cart),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart or increment
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid product ID.",
      });
    }

    // Verify product exists and check stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    let newTotalQty = qty;
    if (existingIndex > -1) {
      newTotalQty = cart.items[existingIndex].quantity + qty;
    }

    if (product.stock < newTotalQty) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} units available in stock. Cannot add ${newTotalQty}.`,
      });
    }

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity = newTotalQty;
    } else {
      cart.items.push({ product: productId, quantity: qty });
    }

    await cart.save();
    cart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json({
      success: true,
      message: `${product.name} added to cart.`,
      cart: formatCartResponse(cart),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quantity for product in cart
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer.",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (product.stock < qty) {
      return res.status(400).json({
        success: false,
        message: `Requested quantity (${qty}) exceeds available stock (${product.stock}).`,
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product is not in your cart.",
      });
    }

    cart.items[itemIndex].quantity = qty;
    await cart.save();
    cart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json({
      success: true,
      message: "Cart updated.",
      cart: formatCartResponse(cart),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove an item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString()
    );

    await cart.save();
    cart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json({
      success: true,
      message: "Item removed from cart.",
      cart: formatCartResponse(cart),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Cart cleared.",
      cart: {
        items: [],
        totalItems: 0,
        subtotal: 0,
        deliveryFee: 0,
        total: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};