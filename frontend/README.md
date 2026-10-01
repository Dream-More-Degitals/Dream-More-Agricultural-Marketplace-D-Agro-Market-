# D-Agro Market AI — Frontend

This is the frontend for **Dream More Agricultural Marketplace with AI (D-Agro Market AI)**, a platform connecting Ethiopian farmers, buyers, suppliers, and transport providers — enhanced with AI-powered agricultural tools.

Built with **React + Vite** and styled using **Tailwind CSS**.

## Tech Stack

| Tool | Purpose |
|---|---|
| React.js | UI library |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| React Router | Client-side routing |


## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── assets/             # Images and media
│   ├── components/         # Reusable UI components (incl. AI chatbot, prediction cards)
│   ├── context/             # React context providers
│   ├── pages/
│   │   ├── Landing/          # Home page
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Auth/             # Login & registration
│   │   ├── AI/               # AI Advisor tools (chatbot, crop recommendation)
│   │   ├── Farmer/           # Farmer portal pages
│   │   ├── Buyer/            # Buyer dashboard, marketplace, cart, orders
│   │   ├── Supplier/         # Supplier portal pages
│   │   ├── Transport/        # Transport provider pages
│   │   └── Admin/            # Admin dashboard, order tracking, profile, notifications
│   ├── routes/               # App route definitions
│   ├── services/             # API calls to the backend
│   ├── styles/               # Global styles
│   ├── utils/                 # Helper functions
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Key Pages & Features

- **Landing / Home** — product introduction and entry points for farmers and buyers
- **AI Advisor** — chat-based agricultural assistant for crops, diseases, soil, and markets
- **Buyer Portal** — marketplace browsing, cart, checkout, and order tracking
- **Farmer Portal** — product listing and sales management
- **Supplier & Transport Portals** — inventory and logistics coordination
- **Admin Dashboard** — user, order, and platform management (in progress)
- **Auth** — registration with role selection (Farmer / Buyer / Supplier / Transport)

## Environment Variables

If the app needs to call the backend API, create a `.env` file in this folder:

```
VITE_API_URL=http://localhost:PORT
```

## Deployment

This app is a static Vite build and can be deployed to any static hosting provider (e.g. Vercel, Netlify) with:

- **Build command:** `npm run build`
- **Output directory:** `dist`
