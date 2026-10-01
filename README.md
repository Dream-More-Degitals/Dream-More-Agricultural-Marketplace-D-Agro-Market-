# D-Agro Agricultural Marketplace & AI Advisor (D-Agro Market AI)

A complete full-stack Ethiopian agricultural digital ecosystem connecting Farmers, Agricultural Input Suppliers, Transporters, Buyers, and Platform Administrators with integrated AI-assisted agronomic tools.

---

## 🌟 Key Platform Features

- **Multi-Role User Ecosystem:**
  - **🌾 Farmer:** Manage farm listings, list harvests, track buyer orders, monitor earnings, and consult AI agronomy tools.
  - **📦 Supplier:** Supply seeds, fertilizers, and irrigation equipment; manage stock levels and fulfill wholesale orders.
  - **🛒 Buyer / Wholesale Partner:** Browse verified agricultural commodities, calculate authoritative orders, manage live carts, and track deliveries.
  - **🚚 Transporter:** Accept agricultural deliveries, update shipment checkpoints, and route from farm to urban markets.
  - **🛡️ Admin:** Platform oversight, user status verification (Active/Blocked), order dispute mediation, and system analytics.

- **Authoritative Server Architecture:**
  - Real-time inventory deduction & stock validation upon order placement.
  - Database-calculated order subtotals and VAT (no client price tampering).
  - Secure JWT authentication with BCrypt password hashing.
  - Role-based authorization middleware enforcing data ownership.
  - Automatic delivery creation linked with order lifecycle.

- **🤖 AI Agronomic Decision Engine:**
  - **Crop Recommendation:** Suggests optimal crops based on soil composition, elevation, temperature, rainfall, and regional seasons.
  - **Crop Disease Detection:** Visual pathology analysis for common Ethiopian crop diseases.
  - **Agricultural Price Prediction:** Commodity forecasting based on harvest cycles and market trends.
  - **AI Agricultural Advisor:** Interactive Q&A consultation for pest management, soil fertilization, and harvesting best practices.

---

## 🏗️ Project Architecture

```
Dream-More-Agricultural-Marketplace-D-Agro-Market-/
├── backend/                       # Production Express & MongoDB REST API
│   ├── src/
│   │   ├── config/                # MongoDB connection
│   │   ├── controllers/           # Auth, Profile, Product, Cart, Order, Delivery, Admin, AI
│   │   ├── middleware/            # Auth, Role-based access, Multer upload, Error handler
│   │   ├── models/                # User, Product, Cart, Order, Delivery, Notification
│   │   ├── routes/                # REST endpoints
│   │   ├── scripts/seed.js        # Full database seed script
│   │   ├── services/              # Order checkout, notification, and AI services
│   │   └── server.js              # Express app entry point
│   ├── tests/api.test.js          # Native automated test suite (20 tests)
│   └── package.json
│
├── frontend/                      # React 19 + Vite + Tailwind CSS Application
│   ├── src/
│   │   ├── components/            # Reusable UI cards, modals, role switchers, layouts
│   │   ├── context/               # AuthContext (JWT auth state), CartContext
│   │   ├── pages/                 # Buyer, Farmer, Supplier, Transport, Admin, AI pages
│   │   ├── routes/AppRoutes.jsx   # Client-side routing
│   │   └── services/api.js        # Centralized HTTP client communicating with backend
│   ├── package.json
│   └── vite.config.js
│
├── README.md                      # Full-stack documentation
```

---

## 🚀 Running the Full Stack Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string.

---

### Step 1: Start the Backend Server

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file from .env.example
cp .env.example .env

# 4. Populate test data (Admin, Farmer, Supplier, Transporter, Buyer, Products, Orders)
npm run seed

# 5. Run automated integration test suite
npm test

# 6. Start the development server (runs on http://localhost:5000)
npm run dev
```

---

### Step 2: Start the Frontend Application

Open a new terminal window:

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start Vite dev server (runs on http://localhost:5173)
npm run dev
```

Open your browser at `http://localhost:5173` to explore the marketplace.

---

## 👥 Demo Login Credentials (Development & Testing)

| Role | Email | Password | Access Dashboard |
| :--- | :--- | :--- | :--- |
| **Platform Admin** | `admin@dagro.com` | `Password@12345` | `/admin/dashboard` |
| **Farmer** | `farmer@dagro.com` | `Password@12345` | `/farmer/dashboard` |
| **Supplier** | `supplier@dagro.com` | `Password@12345` | `/supplier/dashboard` |
| **Transporter** | `transporter@dagro.com` | `Password@12345` | `/transport/dashboard` |
| **Buyer** | `buyer@dagro.com` | `Password@12345` | `/buyer/dashboard` |

---

## 🌐 Production Deployment Guide

### Backend Deployment (Render)
1. Push this repository to GitHub.
2. Log in to [Render](https://render.com) and create a **New Web Service**.
3. Select this repository and set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Configure Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/dagro_marketplace?retryWrites=true&w=majority`
   - `JWT_SECRET`: `your_secure_random_jwt_secret_key`
   - `JWT_EXPIRES_IN`: `7d`
   - `CLIENT_URL`: `https://your-frontend.vercel.app`

### Frontend Deployment (Vercel)
1. Log in to [Vercel](https://vercel.com) and import the repository.
2. Set:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Configure Environment Variables in Vercel:
   - `VITE_API_URL`: `https://your-backend-api.onrender.com/api`
4. Click **Deploy**.

---

## 🧪 Automated Testing

The backend includes a comprehensive 20-test integration suite covering:
- API Health & Status
- Authentication & JWT Authorization
- Product Catalog & Search Filtering
- Shopping Cart & Server-Authoritative Checkout
- Role-Protected Admin Endpoints
- AI Services (Crop Recommendation, Disease Detection, Price Forecast, Advisor)

Run tests anytime with:
```bash
cd backend
npm test
```
