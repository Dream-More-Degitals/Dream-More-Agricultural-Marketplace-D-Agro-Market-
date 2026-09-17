# Dream More Agricultural Marketplace with AI (D-Agro Market AI)

D-Agro Market AI is a web-based agricultural marketplace built to connect Ethiopian farmers, buyers, suppliers, and transport providers through a single digital platform — powered by AI-driven insights and integrated with local digital payment systems.

Agriculture is the backbone of Ethiopia's economy, yet farmers still face unfair pricing, limited market access, delayed payments, and heavy reliance on intermediaries. D-Agro Market AI addresses this gap by combining an online marketplace with AI services, logistics coordination, and secure digital payments (Telebirr, CBE Birr).

## Key Features

**Farmer Management**
- Registration, login, and profile management
- Product listing, editing, and sales history

**Buyer Management**
- Product search & filtering, online purchasing
- Order history and delivery tracking

**AI-Powered Tools**
- Crop Disease Detection — upload crop images, get AI diagnosis + treatment suggestions
- Crop Recommendation — suggests suitable crops based on soil, rainfall, region & season
- Market Price Prediction — forecasts crop prices from historical data
- Multilingual AI Chatbot — agricultural advice in English, Amharic, and Afaan Oromo

**Order & Delivery Management**
- Order placement, confirmation, delivery assignment, and real-time tracking

**Digital Payments**
- Secure integration with Telebirr, CBE Birr, and other banking services

**Reporting & Administration**
- Admin dashboard with analytics on sales, users, revenue, and AI usage

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Tailwind CSS |
| Backend | Node.js, Express.js |
| AI Services | Python, TensorFlow, OpenCV, Scikit-learn |
| Database | MySQL |
| API | RESTful API |
| Version Control | Git & GitHub |

## Project Structure

```
Dream-More-Agricultural-Marketplace-D-Agro-Market-/
├── backend/     # Node.js/Express API, business logic, database layer
└── frontend/    # React + Tailwind Vite app (farmer, buyer, supplier, admin portals)
```

## Getting Started (Frontend)

```bash
cd frontend
npm install
npm run dev
```

The app runs locally at `http://localhost:5173`.

## User Roles

- **Farmer** — lists products, manages orders, gets AI crop guidance
- **Buyer** — browses marketplace, places orders, tracks deliveries
- **Supplier** — manages bulk inventory and sourcing
- **Transport Provider** — coordinates deliveries and logistics
- **Administrator** — oversees users, products, orders, and reports


## License

This project is developed for academic purposes as part of an internship program.
