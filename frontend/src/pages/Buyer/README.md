# 🌾 D-Agro AI Marketplace — Buyer Module Documentation

> **Author / Maintainer:** Buyer Module Team Member  
> **Location:** `frontend/src/pages/Buyer/`  
> **Primary Color Palette:**  
> - **Deep Navy Blue / Slate:** `#343E4F` (Sidebar, Headers, Primary Text)  
> - **Vibrant Orange:** `#E57036` (Buttons, Badges, Highlights, Active Navigation)  
> - **Agricultural Emerald:** `#107C41` / `#0B6132` (Prices, Success States, Verified Badges)  

---

## 📌 Module Overview

This directory contains the **Buyer Dashboard and Portal** for the **Dream-More Agricultural Marketplace (D-Agro Market)**. It is designed to be completely self-contained within this folder and layout structure so teammates working on Farmer or Admin sections can collaborate cleanly without code conflicts.

The Buyer Module provides Ethiopian agricultural buyers (wholesalers, cafes, institutions) with data-driven purchasing tools, real-time coffee/grain market indexes, AI-driven yield and climate advice, item detail views, cart management, and order tracking.

---

## 📁 File & Component Structure

All files for this task are localized within the Buyer folder structure and associated layouts:

```text
frontend/src/
├── pages/
│   └── Buyer/
│       ├── README.md               <-- (This Documentation File)
│       ├── BuyerDashboard.jsx      <-- Main Buyer Dashboard Page
│       ├── MarketplacePage.jsx     <-- Product Search & Catalog Page
│       ├── ProductDetailPage.jsx   <-- Single Product Detail Page
│       ├── CheckoutPage.jsx        <-- Order Checkout & Payment Page
│       └── OrdersPage.jsx          <-- Active & Past Orders Tracking Page
├── components/
│   ├── layout/
│   │   └── BuyerLayout.jsx         <-- Dedicated Collapsible Sidebar & TopBar Layout
│   └── marketplace/
│       ├── ProductCard.jsx         <-- Interactive Clickable Product Card
│       ├── ProductGrid.jsx         <-- Responsive Grid Container
│       ├── CategoryFilter.jsx      <-- Crop Category Pills
│       └── SearchBar.jsx           <-- Search & Filter Input Bar
└── context/
    └── CartContext.jsx             <-- Shared Buyer Cart, Wishlist & Order State
```

---

## 🚀 Key Pages & Features

### 1. Buyer Dashboard (`/buyer/dashboard`)
- **Greeting Header**: Personalized user greeting with unread notification pill.
- **Coffee Market Index**: Live market ticker card showing percentage changes (`+4.2%`) and crop trends.
- **AI Market Suggestions**: 3 distinct cards driven by predictive models:
  - *High Yield Opportunity* (Dark Emerald)
  - *Logistics AI Alert* (Warm Brown)
  - *Climate Advisor* (Amber/Cream)
- **Category Filter & Products Grid**: Dynamic category tabs (Grains, Coffee, Spices) rendering interactive product cards.
- **Clickable Product Cards**: Clicking any product card navigates seamlessly to `/buyer/product/:id`.
- **Active Orders Table**: Summary of current orders with status badges (`In Transit`, `Processing`).

### 2. Marketplace Catalog (`/buyer/marketplace`)
- **Search & Filtering**: Live search by product name, region (e.g., Sidama, Gojjam), or farmer/coop name.
- **Interactive Grid**: Full grid of verified produce with grade tags, organic indicators, and "Order Now" quick-add actions.

### 3. Product Detail Page (`/buyer/product/:id`)
- **Breadcrumb Navigation**: Direct pathing (`Marketplace > Category > Product`).
- **Interactive Image Gallery**: Large main preview with selectable thumbnail strip.
- **Verification & Rating**: Verified Quality badge (`#107C41`), star ratings, review count.
- **AI Market Advisor Card**: Tailored advice on optimal purchasing timing based on 30-day price trends.
- **Seller Profile Card**: Coop/farmer info with sales metrics and contact option.
- **Attribute Specifications**: Roast level, quality grade (e.g. G1 Organic), processing method, and altitude parameters.
- **Customer Reviews**: Verified buyer feedback and rating breakdown.
- **Sticky Purchase Bar**: Fixed bottom bar with *Add to Cart* and *Buy Now* quick triggers.

### 4. Checkout & Payment (`/buyer/checkout`)
- Delivery address selection (Addis Ababa, Bole Sub-City, etc.).
- Payment options including **Telebirr** and **CBE Birr**.
- Order breakdown with 15% VAT calculation and total ETB display.

### 5. Orders Tracking (`/buyer/orders`)
- Color-coded order status timeline and summary.

---

## 🎨 Layout & Navigation Setup

The buyer layout uses **React Router (`Outlet`)** to maintain a persistent sidebar and topbar across all buyer views.

### Sidebar Navigation Items (`BuyerLayout.jsx`)
| Icon | Label | Path |
|---|---|---|
| `LayoutDashboard` | Dashboard | `/buyer/dashboard` |
| `Store` | Marketplace | `/buyer/marketplace` |
| `ClipboardList` | My Orders | `/buyer/orders` |
| `Bot` | AI Advisor | `/buyer/ai` |
| `User` | Profile | `/buyer/profile` |

---

## 🔗 Routing Configuration (`AppRoutes.jsx`)

```jsx
// Buyer nested routes inside AppRoutes.jsx
<Route path="/buyer" element={<BuyerLayout />}>
  <Route index element={<Navigate to="/buyer/dashboard" replace />} />
  <Route path="dashboard text" element={<BuyerDashboard />} />
  <Route path="marketplace" element={<MarketplacePage />} />
  <Route path="product/:id" element={<ProductDetailPage />} />
  <Route path="checkout font-bold" element={<CheckoutPage />} />
  <Route path="orders" element={<OrdersPage />} />
  <Route path="ai" element={<AIPage />} />
  <Route path="profile" element={<ProfilePage />} />
</Route>
```

---

## 🛠️ State Management Integration (`CartContext.jsx`)

The Buyer module uses `useCart()` hook for:
- `cart`: Items, quantities, and subtotal calculations.
- `wishlist`: Product bookmarking array.
- `addToCart(product, qty)`: Adds item without navigating away.
- `placeOrder(details)`: Submits order and updates `activeOrders`.
- `userProfile`: Buyer user data and role settings.

---

## 💡 Instructions for Teammates

1. **Do not modify `frontend/src/pages/Buyer/`**: All buyer-specific code is isolated inside this folder.
2. **Linking to Buyer Pages**: Use `/buyer/dashboard` or `/buyer/product/:id` for navigation.
3. **Shared Components**: Shared UI elements are in `src/components/common/` (`Card.jsx`, `Button.jsx`, `Badge.jsx`).

---
*Documented for D-Agro Market Buyer Task.*
