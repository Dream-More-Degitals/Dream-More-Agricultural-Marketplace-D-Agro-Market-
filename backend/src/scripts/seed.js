import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Delivery from "../models/Delivery.js";
import Notification from "../models/Notification.js";
import Cart from "../models/Cart.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dagro_marketplace";

const seedData = async () => {
  try {
    console.log("[Seed] Connecting to database:", mongoURI);
    await mongoose.connect(mongoURI);
    console.log("[Seed] Connected successfully. Resetting demo collections...");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Delivery.deleteMany({}),
      Notification.deleteMany({}),
      Cart.deleteMany({}),
    ]);

    console.log("[Seed] Creating development demo users...");

    // Password for all demo accounts (Development only)
    const demoPassword = "Password@12345";

    const adminUser = await User.create({
      name: "D-Agro Administrator",
      email: "admin@dagro.com",
      password: demoPassword,
      roles: ["admin"],
      phone: "+251 911 000 001",
      location: "Addis Ababa",
      status: "Active",
      profile: {
        name: "D-Agro Administrator",
        email: "admin@dagro.com",
        phone: "+251 911 000 001",
        location: "Addis Ababa",
        bio: "Platform Administrator overseeing the D-Agro Agricultural Marketplace ecosystem.",
      },
    });

    const farmerUser = await User.create({
      name: "Alemayehu Tadesse",
      email: "farmer@dagro.com",
      password: demoPassword,
      roles: ["farmer"],
      phone: "+251 911 234 567",
      location: "Jimma, Oromia",
      status: "Active",
      profile: {
        name: "Alemayehu Tadesse",
        email: "farmer@dagro.com",
        phone: "+251 911 234 567",
        location: "Jimma, Oromia",
        bio: "Dedicated coffee and teff farmer using sustainable organic agricultural methods.",
        farmName: "Alemayehu Organic Farm",
        farmType: "Crop & Horticulture",
        farmLocation: "Jimma Zone, Oromia Region",
        farmingExperience: "12 years",
      },
    });

    const supplierUser = await User.create({
      name: "Tigist Bekele",
      email: "supplier@dagro.com",
      password: demoPassword,
      roles: ["supplier"],
      phone: "+251 922 345 678",
      location: "Bahir Dar, Amhara",
      status: "Active",
      profile: {
        name: "Tigist Bekele",
        email: "supplier@dagro.com",
        phone: "+251 922 345 678",
        location: "Bahir Dar, Amhara",
        bio: "Licensed agricultural input distributor providing certified seeds and organic fertilizers.",
        businessName: "Abyssinia Agro Supplies",
        businessType: "Agricultural Inputs & Machinery",
        businessLocation: "Bahir Dar Central Market",
        businessDescription: "Distributor of certified high-yield seeds, organic fertilizers, and irrigation equipment.",
      },
    });

    const transporterUser = await User.create({
      name: "Dawit Tesfaye",
      email: "transporter@dagro.com",
      password: demoPassword,
      roles: ["transporter"],
      phone: "+251 933 456 789",
      location: "Addis Ababa",
      status: "Active",
      profile: {
        name: "Dawit Tesfaye",
        email: "transporter@dagro.com",
        phone: "+251 933 456 789",
        location: "Addis Ababa",
        bio: "Professional refrigerated agricultural logistics provider serving routes across all Ethiopian regions.",
        vehicleType: "Isuzu 5-Ton Refrigerated Truck",
        vehiclePlate: "AA-3-98214",
        serviceArea: "Central, Oromia, Amhara, SNNPR",
      },
    });

    const buyerUser = await User.create({
      name: "Abebe Bikila",
      email: "buyer@dagro.com",
      password: demoPassword,
      roles: ["buyer"],
      phone: "+251 944 567 890",
      location: "Bole, Addis Ababa",
      status: "Active",
      profile: {
        name: "Abebe Bikila",
        email: "buyer@dagro.com",
        phone: "+251 944 567 890",
        location: "Bole, Addis Ababa",
        bio: "Wholesale food processor and agricultural commodities buyer.",
        deliveryAddress: "Bole Sub-City, Woreda 03, House No. 445, Addis Ababa",
      },
    });

    console.log("[Seed] Creating demo products...");

    const products = await Product.create([
      {
        name: "White Teff (Magna)",
        slug: "white-teff-magna-demo",
        category: "Grains & Legumes",
        description: "High-grade Magna Teff, iron-rich and gluten-free. Grown in nutrient-rich soils of Gojjam using traditional sustainable methods.",
        price: 180,
        unit: "kg",
        stock: 120,
        location: "Gojam, Amhara Region",
        image: "/images/teff.jpg",
        badge: "PREMIUM QUALITY",
        seller: farmerUser._id,
        sellerType: "Farmer",
        sellerName: farmerUser.name,
        status: "Available",
      },
      {
        name: "Yirgacheffe Arabica Coffee",
        slug: "yirgacheffe-coffee-demo",
        category: "Coffee",
        description: "Grade 1 Specialty Arabica beans with distinct floral and citrus notes. Clean cup quality with smooth wine-like finish.",
        price: 850,
        unit: "kg",
        stock: 65,
        location: "Gedeo, SNNPR",
        image: "/images/coffee.jpg",
        badge: "ORGANIC CERTIFIED",
        seller: farmerUser._id,
        sellerType: "Farmer",
        sellerName: farmerUser.name,
        status: "Available",
      },
      {
        name: "Fresh Red Onions",
        slug: "fresh-red-onions-demo",
        category: "Vegetables",
        description: "Firm, high-flavor red onions harvested fresh. Long shelf life, ideal for commercial wholesale buyers and restaurant chains.",
        price: 120,
        unit: "kg",
        stock: 250,
        location: "Meki, Oromia Region",
        image: "/images/onions.jpg",
        badge: "FRESH HARVEST",
        seller: farmerUser._id,
        sellerType: "Farmer",
        sellerName: farmerUser.name,
        status: "Available",
      },
      {
        name: "Cold-Pressed Niger Seed Oil (Nug)",
        slug: "niger-seed-oil-demo",
        category: "Oils & Seeds",
        description: "Cold-pressed pure Nug oil. Rich in Omega-3 and natural antioxidants, unrefined and 100% natural.",
        price: 450,
        unit: "liter",
        stock: 80,
        location: "Wollega, Oromia",
        image: "/images/niger-oil.jpg",
        badge: "100% PURE",
        seller: farmerUser._id,
        sellerType: "Farmer",
        sellerName: farmerUser.name,
        status: "Available",
      },
      {
        name: "Organic NPK Fertilizer",
        slug: "organic-npk-fertilizer-demo",
        category: "Fertilizer",
        description: "Enriched organic macro and micro nutrient fertilizer to optimize crop yields and soil microbial health.",
        price: 850,
        unit: "bag",
        stock: 150,
        location: "Jimma, Oromia",
        image: "/images/product-placeholder.jpg",
        badge: "CERTIFIED",
        seller: supplierUser._id,
        sellerType: "Supplier",
        sellerName: supplierUser.name,
        status: "Available",
      },
      {
        name: "High-Yield Maize Seeds",
        slug: "hybrid-maize-seeds-demo",
        category: "Seeds",
        description: "Drought-tolerant hybrid maize seeds certified by the Ethiopian Agricultural Authority for highland and midland zones.",
        price: 450,
        unit: "kg",
        stock: 90,
        location: "Bahir Dar, Amhara",
        image: "/images/product-placeholder.jpg",
        badge: "HIGH YIELD",
        seller: supplierUser._id,
        sellerType: "Supplier",
        sellerName: supplierUser.name,
        status: "Available",
      },
    ]);

    console.log(`[Seed] Created ${products.length} products.`);

    console.log("[Seed] Creating sample order...");
    const sampleOrder = await Order.create({
      orderNumber: "ORD-8902",
      buyer: buyerUser._id,
      items: [
        {
          product: products[0]._id,
          name: products[0].name,
          price: products[0].price,
          quantity: 20,
          unit: "kg",
          image: products[0].image,
          seller: farmerUser._id,
          sellerType: "Farmer",
          sellerName: farmerUser.name,
          slug: products[0].slug,
        },
        {
          product: products[4]._id,
          name: products[4].name,
          price: products[4].price,
          quantity: 2,
          unit: "bag",
          image: products[4].image,
          seller: supplierUser._id,
          sellerType: "Supplier",
          sellerName: supplierUser.name,
          slug: products[4].slug,
        },
      ],
      customer: {
        fullName: buyerUser.name,
        phone: buyerUser.phone,
        region: "Addis Ababa",
        city: "Bole",
        address: "Bole Sub-City, Woreda 03, House No. 445",
      },
      deliveryMethod: "standard",
      deliveryFee: 150,
      subtotal: 180 * 20 + 850 * 2, // 3600 + 1700 = 5300
      total: 5300 + 150, // 5450
      paymentMethod: "telebirr",
      status: "In Transit",
      statusHistory: [
        { status: "Processing", changedAt: new Date(Date.now() - 3600000 * 24) },
        { status: "Confirmed", changedAt: new Date(Date.now() - 3600000 * 18) },
        { status: "In Transit", changedAt: new Date(Date.now() - 3600000 * 6) },
      ],
      date: new Date().toLocaleDateString(),
    });

    console.log("[Seed] Creating sample delivery...");
    await Delivery.create({
      deliveryId: "DEL-1001",
      order: sampleOrder._id,
      orderNumber: sampleOrder.orderNumber,
      transportProvider: transporterUser._id,
      transporter: transporterUser.name,
      customer: buyerUser.name,
      phone: buyerUser.phone,
      pickup: "Gojam, Amhara Region",
      destination: "Bole, Addis Ababa",
      product: "White Teff & Fertilizer (x22 units)",
      quantity: 22,
      status: "In Transit",
    });

    console.log("[Seed] Creating notifications...");
    await Notification.create([
      {
        user: buyerUser._id,
        title: "Order Shipped",
        message: "Your order ORD-8902 has been picked up by Dawit Transport and is in transit.",
        type: "order",
        link: "/buyer/orders",
      },
      {
        user: farmerUser._id,
        title: "Product Sold",
        message: "20kg of White Teff was ordered by Abebe Bikila.",
        type: "order",
        link: "/farmer/orders",
      },
      {
        user: adminUser._id,
        title: "System Update",
        message: "D-Agro full-stack backend initialized successfully.",
        type: "system",
      },
    ]);

    console.log("\n=================================================");
    console.log("   D-AGRO DATABASE SEEDED SUCCESSFULLY! (DEV ONLY)");
    console.log("=================================================");
    console.log("Development Login Credentials:");
    console.log("  Admin:       admin@dagro.com       / Password@12345");
    console.log("  Farmer:      farmer@dagro.com      / Password@12345");
    console.log("  Supplier:    supplier@dagro.com    / Password@12345");
    console.log("  Transporter: transporter@dagro.com / Password@12345");
    console.log("  Buyer:       buyer@dagro.com       / Password@12345");
    console.log("=================================================\n");

    process.exit(0);
  } catch (error) {
    console.error("[Seed Error]", error);
    process.exit(1);
  }
};

seedData();