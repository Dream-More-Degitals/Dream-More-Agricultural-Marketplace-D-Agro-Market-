import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import Delivery from "../models/Delivery.js";
import { createNotification } from "./notificationService.js";

export const processNewOrder = async ({
  buyerId,
  customer,
  deliveryMethod = "standard",
  paymentMethod = "cash",
  itemsInput = null, // if null, load from Cart
}) => {
  let cartItems = [];

  if (itemsInput && Array.isArray(itemsInput) && itemsInput.length > 0) {
    cartItems = itemsInput;
  } else {
    const cart = await Cart.findOne({ user: buyerId }).populate("items.product");
    if (!cart || !cart.items || cart.items.length === 0) {
      throw new Error("Your cart is empty. Add products before placing an order.");
    }
    cartItems = cart.items.map((i) => ({
      productId: i.product._id,
      quantity: i.quantity,
    }));
  }

  // 1. Validate all products and retrieve authoritative prices from MongoDB
  const verifiedItems = [];
  let subtotal = 0;
  const sellerIds = new Set();

  for (const item of cartItems) {
    const productId = item.productId || item.id || item.product;
    const requestedQty = Number(item.quantity || 1);

    if (requestedQty <= 0) {
      throw new Error("Invalid product quantity requested.");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} no longer exists.`);
    }

    if (product.status === "Out of Stock" || product.stock < requestedQty) {
      throw new Error(
        `Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${requestedQty}`
      );
    }

    const itemTotal = product.price * requestedQty;
    subtotal += itemTotal;
    sellerIds.add(product.seller.toString());

    verifiedItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: requestedQty,
      unit: product.unit || "kg",
      image: product.image || "/images/product-placeholder.jpg",
      seller: product.seller,
      sellerType: product.sellerType || "Farmer",
      sellerName: product.sellerName || "D-Agro Seller",
      slug: product.slug,
    });
  }

  // 2. Authoritative Delivery Fee calculation
  const isExpress = String(deliveryMethod).toLowerCase() === "express";
  const deliveryFee = isExpress ? 300 : 150;
  const total = subtotal + deliveryFee;

  // 3. Generate unique human-readable order number
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  // 4. Create the Order
  const order = await Order.create({
    orderNumber,
    buyer: buyerId,
    items: verifiedItems,
    customer,
    deliveryMethod: isExpress ? "express" : "standard",
    deliveryFee,
    subtotal,
    total,
    paymentMethod,
    status: "Processing",
    statusHistory: [
      {
        status: "Processing",
        changedAt: new Date(),
        changedBy: buyerId,
        note: "Order created successfully",
      },
    ],
  });

  // 5. Decrement product stock in MongoDB
  for (const item of verifiedItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  // 6. Clear buyer's cart in MongoDB
  await Cart.findOneAndUpdate({ user: buyerId }, { $set: { items: [] } });

  // 7. Automatically create Delivery tracking record
  const deliveryId = `DEL-${Date.now().toString().slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;
  const productSummary = verifiedItems.map((i) => `${i.name} (x${i.quantity})`).join(", ");
  const totalQuantity = verifiedItems.reduce((acc, i) => acc + i.quantity, 0);

  await Delivery.create({
    deliveryId,
    order: order._id,
    orderNumber: order.orderNumber,
    customer: customer.fullName,
    phone: customer.phone,
    pickup: verifiedItems[0]?.location || "D-Agro Distribution Center",
    destination: `${customer.city}, ${customer.region}`,
    product: productSummary,
    quantity: totalQuantity,
    status: "Ready for Pickup",
  });

  // 8. Create notifications for buyer and sellers
  await createNotification({
    userId: buyerId,
    title: "Order Placed Successfully",
    message: `Your order ${order.orderNumber} for ETB ${total.toLocaleString()} has been received and is processing.`,
    type: "order",
    link: `/buyer/orders`,
  });

  for (const sellerId of sellerIds) {
    await createNotification({
      userId: sellerId,
      title: "New Order Received",
      message: `You have a new order ${order.orderNumber} containing your agricultural products.`,
      type: "order",
      link: `/farmer/orders`,
    });
  }

  return order;
};