# D-Agro Agricultural Marketplace — Backend REST API

Production-ready, robust, and secure Node.js / Express.js REST API with MongoDB Atlas integration, JWT authentication, role-based authorization, and automated tests.

---

## 🛠 Tech Stack

- **Runtime:** Node.js (>= 18.0.0, ES Modules)
- **Framework:** Express.js (v4.21+)
- **Database:** MongoDB & Mongoose (v8.9+)
- **Security:** Helmet, CORS, Express-Rate-Limit, BCryptJS
- **Authentication:** JSON Web Tokens (JWT) with Bearer token header
- **Testing:** Node.js native test runner (`node:test`, `node:assert`) + Supertest
- **File Uploads:** Multer with file type filtering & size constraints

---

## 📁 Architecture & Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                   # MongoDB Atlas connection & event listeners
│   ├── controllers/
│   │   ├── adminController.js       # User & system administration
│   │   ├── aiController.js          # AI diagnosis, advisory, & prediction endpoints
│   │   ├── authController.js        # Register, login, forgot/reset password
│   │   ├── cartController.js        # Server-authoritative shopping cart
│   │   ├── deliveryController.js    # Delivery tracking & logistics updates
│   │   ├── notificationController.js# User notifications & preferences
│   │   ├── orderController.js       # Order creation, status transitions, seller queries
│   │   ├── productController.js     # CRUD, slug generation, stock indexing
│   │   └── profileController.js     # User profile retrieval & synchronization
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification, active status check
│   │   ├── errorMiddleware.js       # Centralized 404 & Cast/Validation error handler
│   │   ├── roleMiddleware.js        # Multi-role access control (Admin, Farmer, Supplier, etc.)
│   │   └── uploadMiddleware.js      # Multer file upload handler
│   ├── models/
│   │   ├── Cart.js                  # User cart & item references
│   │   ├── Delivery.js              # Shipment tracking linked to orders
│   │   ├── Notification.js          # User alerts & preference filters
│   │   ├── Order.js                 # Authoritative order items, pricing, & state machine
│   │   ├── Product.js               # Agricultural product catalog & search indexes
│   │   └── User.js                  # User identity, multi-role arrays, & hashed passwords
│   ├── routes/
│   │   ├── adminRoutes.js           # /api/admin
│   │   ├── aiRoutes.js              # /api/ai
│   │   ├── authRoutes.js            # /api/auth
│   │   ├── cartRoutes.js            # /api/cart
│   │   ├── deliveryRoutes.js        # /api/deliveries
│   │   ├── notificationRoutes.js    # /api/notifications
│   │   ├── orderRoutes.js           # /api/orders
│   │   ├── productRoutes.js         # /api/products
│   │   ├── profileRoutes.js         # /api/profile
│   │   └── uploadRoutes.js          # /api/upload
│   ├── scripts/
│   │   └── seed.js                  # Development database seed script
│   ├── services/
│   │   ├── ai/
│   │   │   ├── aiAdvisorService.js          # Agro-advisory knowledge engine
│   │   │   ├── cropRecommendationService.js # Soil & climate recommendation rules
│   │   │   ├── diseaseDetectionService.js   # Image analysis demonstration service
│   │   │   └── pricePredictionService.js    # Commodity forecast calculation
│   │   ├── notificationService.js   # Notification creation respecting user preferences
│   │   └── orderService.js          # Server-authoritative checkout, stock decrement, & delivery
│   └── server.js                    # Express app initialization, middleware, routes, listener
├── tests/
│   └── api.test.js                  # Automated integration tests (20 tests covering all domains)
├── uploads/                         # Uploaded product & leaf image assets
├── .env.example                     # Sample environment variables
├── package.json
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/dagro_marketplace
# For production (MongoDB Atlas):
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dagro_marketplace?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Seed Database (Dev / Demo Data)
Populates demo users (Admin, Farmer, Supplier, Transporter, Buyer), sample products, orders, and delivery records:
```bash
npm run seed
```

**Default Demo Credentials:**
- **Admin:** `admin@dagro.com` / `Password@12345`
- **Farmer:** `farmer@dagro.com` / `Password@12345`
- **Supplier:** `supplier@dagro.com` / `Password@12345`
- **Transporter:** `transporter@dagro.com` / `Password@12345`
- **Buyer:** `buyer@dagro.com` / `Password@12345`

### 3. Start Server
- Development (with Nodemon):
  ```bash
  npm run dev
  ```
- Production:
  ```bash
  npm start
  ```

### 4. Run Automated Test Suite
Executes the native Node.js test suite with Supertest:
```bash
npm test
```

---

## 🌐 API Route Endpoints Summary

### System
- `GET /api/health` — API health check and environment status

### Authentication & Profile (`/api/auth`, `/api/profile`)
- `POST /api/auth/register` — Register a new multi-role account
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/auth/me` — Get current authenticated user profile
- `POST /api/auth/logout` — Logout user session
- `POST /api/auth/forgot-password` — Request password reset email/token
- `POST /api/auth/reset-password/:token` — Set new password with valid token
- `GET /api/profile` — Get full profile details
- `PUT /api/profile` — Update user profile

### Products (`/api/products`)
- `GET /api/products` — Filter products by search, category, location, sellerType, price
- `GET /api/products/:id` — Get single product details
- `GET /api/products/slug/:slug` — Get product by URL slug
- `GET /api/products/seller/my-products` — Get authenticated farmer/supplier products
- `POST /api/products` — Create new product listing (Farmer/Supplier/Admin)
- `PUT /api/products/:id` — Update product listing (Enforces ownership)
- `DELETE /api/products/:id` — Delete product listing (Enforces ownership)

### Cart (`/api/cart`)
- `GET /api/cart` — Get authenticated user's cart
- `POST /api/cart` — Add item to cart with quantity
- `PUT /api/cart` — Update item quantity in cart
- `DELETE /api/cart/:productId` — Remove specific item from cart
- `DELETE /api/cart` — Clear entire cart

### Orders (`/api/orders`)
- `POST /api/orders` — Authoritative checkout (validates stock, calculates DB prices, decrements inventory, creates delivery)
- `GET /api/orders/my-orders` — Get current buyer's order history
- `GET /api/orders/farmer` — Get incoming orders containing farmer's products
- `GET /api/orders/supplier` — Get incoming orders containing supplier's products
- `GET /api/orders/:id` — Get single order details
- `PATCH /api/orders/:id/status` — Update order status (Processing, Confirmed, Shipped, In Transit, Delivered, Cancelled)

### Deliveries (`/api/deliveries`)
- `GET /api/deliveries` — List deliveries with optional role filtering
- `GET /api/deliveries/:id` — Get delivery details
- `POST /api/deliveries` — Create delivery record
- `PATCH /api/deliveries/:id/status` — Update delivery status (Ready for Pickup, In Transit, Delivered)
- `PATCH /api/deliveries/:id/assign` — Assign transporter provider

### AI Services (`/api/ai`)
- `POST /api/ai/crop-recommendation` — Agro-ecological crop recommendation based on soil, rain, and temperature
- `POST /api/ai/disease-detection` — Crop leaf disease pathology analyzer (multipart image or base64)
- `POST /api/ai/price-prediction` — Commodity price forecasting based on market trends
- `POST /api/ai/advisor` — Agricultural Q&A expert advice engine

### Admin (`/api/admin`)
- `GET /api/admin/dashboard` — Platform statistics (user counts, revenue, orders, deliveries)
- `GET /api/admin/users` — List platform users with search and role filters
- `PATCH /api/admin/users/:id/status` — Change user status (Active, Blocked, Suspended)
- `GET /api/admin/products` — Manage all platform product listings
- `PATCH /api/admin/products/:id/status` — Toggle product status (Active, Suspended)
- `GET /api/admin/orders` — View and manage all platform orders

### Media Upload (`/api/upload`)
- `POST /api/upload` — Multipart image upload (JPEG/PNG/WebP, max 5MB)

---

## ☁️ Deployment Guide (Render & MongoDB Atlas)

### 1. MongoDB Atlas Setup
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Under **Network Access**, add IP `0.0.0.0/0` (allow access from anywhere, required for dynamic cloud hosting like Render).
3. Under **Database Access**, create a user with read/write privileges.
4. Copy the connection string:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/dagro_marketplace?retryWrites=true&w=majority`

### 2. Render Web Service Deployment
1. Connect your GitHub repository to [Render](https://render.com).
2. Choose **Web Service**.
3. Set the following parameters:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add **Environment Variables** in the Render Dashboard:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (or leave default, backend binds dynamically to `process.env.PORT` on `0.0.0.0`)
   - `MONGO_URI`: `mongodb+srv://<user>:<password>@cluster.mongodb.net/dagro_marketplace?retryWrites=true&w=majority`
   - `JWT_SECRET`: `secure_production_jwt_random_string_here`
   - `JWT_EXPIRES_IN`: `7d`
   - `CLIENT_URL`: `https://your-frontend-app.vercel.app`
5. Click **Deploy Web Service**.
