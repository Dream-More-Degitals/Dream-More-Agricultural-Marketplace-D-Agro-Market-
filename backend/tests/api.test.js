import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../src/server.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dagro_marketplace";

describe("D-Agro Production API Suite", () => {
  let buyerToken = "";
  let farmerToken = "";
  let adminToken = "";
  let sampleProductId = "";

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
    }
  });

  after(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  describe("System & Health", () => {
    test("GET /api/health should return 200 and success status", async () => {
      const res = await request(app).get("/api/health");
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.message, "D-Agro API is running");
      assert.ok(res.body.timestamp);
    });

    test("GET /api/unknown-route should return 404", async () => {
      const res = await request(app).get("/api/non-existent-endpoint");
      assert.equal(res.status, 404);
      assert.equal(res.body.success, false);
    });
  });

  describe("Authentication API", () => {
    test("POST /api/auth/login - Buyer Login should succeed", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "buyer@dagro.com",
          password: "Password@12345",
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.token);
      assert.equal(res.body.user.email, "buyer@dagro.com");
      buyerToken = res.body.token;
    });

    test("POST /api/auth/login - Farmer Login should succeed", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "farmer@dagro.com",
          password: "Password@12345",
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.token);
      farmerToken = res.body.token;
    });

    test("POST /api/auth/login - Admin Login should succeed", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "admin@dagro.com",
          password: "Password@12345",
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.token);
      adminToken = res.body.token;
    });

    test("POST /api/auth/login - Invalid credentials should return 401", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: "buyer@dagro.com",
          password: "WrongPassword999!",
        });

      assert.equal(res.status, 401);
      assert.equal(res.body.success, false);
    });

    test("GET /api/auth/me - Authenticated user info check", async () => {
      const res = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${buyerToken}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.user.email, "buyer@dagro.com");
    });
  });

  describe("Products API", () => {
    test("GET /api/products should return list of products", async () => {
      const res = await request(app).get("/api/products");
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(Array.isArray(res.body.products));
      assert.ok(res.body.products.length > 0);
      sampleProductId = res.body.products[0]._id;
    });

    test("GET /api/products/:id should return single product details", async () => {
      assert.ok(sampleProductId, "Sample product ID must exist");
      const res = await request(app).get(`/api/products/${sampleProductId}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.equal(res.body.product._id, sampleProductId);
    });

    test("GET /api/products with search query filter", async () => {
      const res = await request(app).get("/api/products?search=Coffee");
      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(Array.isArray(res.body.products));
    });
  });

  describe("Cart & Order Management", () => {
    test("GET /api/cart should retrieve buyer cart", async () => {
      const res = await request(app)
        .get("/api/cart")
        .set("Authorization", `Bearer ${buyerToken}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(Array.isArray(res.body.cart.items));
    });

    test("POST /api/cart should add item to cart", async () => {
      const res = await request(app)
        .post("/api/cart")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send({
          productId: sampleProductId,
          quantity: 2,
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.cart.items.length > 0);
    });

    test("POST /api/orders should authoritatively create an order", async () => {
      const res = await request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send({
          items: [
            {
              productId: sampleProductId,
              quantity: 1,
            },
          ],
          customer: {
            fullName: "Abebe Bikila",
            phone: "+251 911 234 567",
            region: "Addis Ababa",
            city: "Bole",
            address: "House 445",
          },
          deliveryMethod: "standard",
          paymentMethod: "telebirr",
        });

      assert.equal(res.status, 201);
      assert.equal(res.body.success, true);
      assert.ok(res.body.order);
      assert.ok(res.body.order.orderNumber);
      assert.equal(res.body.order.items.length, 1);
      assert.ok(res.body.order.total > 0);
    });

    test("GET /api/orders/my-orders should list buyer orders", async () => {
      const res = await request(app)
        .get("/api/orders/my-orders")
        .set("Authorization", `Bearer ${buyerToken}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(Array.isArray(res.body.orders));
      assert.ok(res.body.orders.length > 0);
    });
  });

  describe("AI Diagnostic & Advisory Services", () => {
    test("POST /api/ai/crop-recommendation returns structured guidance", async () => {
      const res = await request(app)
        .post("/api/ai/crop-recommendation")
        .send({
          region: "Oromia",
          soil: "clay",
          temperature: 22,
          rainfall: 850,
          season: "kiremt",
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.recommendation);
      assert.equal(res.body.recommendation.isDemoRuleBased, true);
    });

    test("POST /api/ai/disease-detection returns structured detection", async () => {
      const res = await request(app)
        .post("/api/ai/disease-detection")
        .send({
          cropType: "Coffee",
          image: "https://example.com/leaf.jpg",
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.result);
      assert.equal(res.body.result.cropType, "Coffee");
    });

    test("POST /api/ai/price-prediction returns forecast", async () => {
      const res = await request(app)
        .post("/api/ai/price-prediction")
        .send({
          product: "White Teff",
          region: "Addis Ababa",
          currentPrice: 150,
          quantity: 50,
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.prediction);
      assert.ok(res.body.prediction.currentPrice);
    });

    test("POST /api/ai/advisor returns consultation", async () => {
      const res = await request(app)
        .post("/api/ai/advisor")
        .send({
          message: "How should I store Teff to prevent pest infestation?",
        });

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.reply);
    });
  });

  describe("Admin APIs & Role Protection", () => {
    test("GET /api/admin/dashboard should allow Admin", async () => {
      const res = await request(app)
        .get("/api/admin/dashboard")
        .set("Authorization", `Bearer ${adminToken}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.success, true);
      assert.ok(res.body.stats);
    });

    test("GET /api/admin/dashboard should reject non-Admin (Buyer)", async () => {
      const res = await request(app)
        .get("/api/admin/dashboard")
        .set("Authorization", `Bearer ${buyerToken}`);

      assert.equal(res.status, 403);
      assert.equal(res.body.success, false);
    });
  });
});
