/**
 * D-Agro Agricultural Marketplace — Centralized API Client
 * Provides structured, authenticated HTTP communication with the Node/Express backend.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Core HTTP Request Wrapper
 */
async function apiRequest(endpoint, { method = "GET", body = null, headers = {} } = {}) {
  const token = localStorage.getItem("token");

  const config = {
    method,
    headers: {
      ...headers,
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (body) {
    if (body instanceof FormData) {
      // Browser automatically sets Content-Type for FormData with boundary
    } else {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(body);
    }
  }

  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        (data && (data.message || data.error)) ||
        `Request failed with status ${response.status} (${response.statusText})`;
      
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    // If it's a fetch network error (e.g. backend server is offline)
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      const networkError = new Error(
        "Unable to connect to D-Agro server. Please check your internet connection or backend server status."
      );
      networkError.isNetworkError = true;
      throw networkError;
    }
    throw err;
  }
}

// -------------------------------------------------------------
// Authentication & Profile Services
// -------------------------------------------------------------
export const authAPI = {
  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: credentials,
    }),

  register: (userData) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: userData,
    }),

  getMe: () =>
    apiRequest("/auth/me", {
      method: "GET",
    }),

  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),

  forgotPassword: (email) =>
    apiRequest("/auth/forgot-password", {
      method: "POST",
      body: { email },
    }),

  resetPassword: (token, password) =>
    apiRequest(`/auth/reset-password/${token}`, {
      method: "POST",
      body: { password },
    }),

  getProfile: () =>
    apiRequest("/profile", {
      method: "GET",
    }),

  updateProfile: (profileData) =>
    apiRequest("/profile", {
      method: "PUT",
      body: profileData,
    }),
};

// -------------------------------------------------------------
// Products API
// -------------------------------------------------------------
export const productAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/products${query ? `?${query}` : ""}`);
  },

  getById: (id) => apiRequest(`/products/${id}`),

  getBySlug: (slug) => apiRequest(`/products/slug/${slug}`),

  getMyProducts: () => apiRequest("/products/seller/my-products"),

  create: (productData) =>
    apiRequest("/products", {
      method: "POST",
      body: productData,
    }),

  update: (id, productData) =>
    apiRequest(`/products/${id}`, {
      method: "PUT",
      body: productData,
    }),

  delete: (id) =>
    apiRequest(`/products/${id}`, {
      method: "DELETE",
    }),
};

// -------------------------------------------------------------
// Cart API
// -------------------------------------------------------------
export const cartAPI = {
  getCart: () => apiRequest("/cart"),

  addToCart: (productId, quantity = 1) =>
    apiRequest("/cart", {
      method: "POST",
      body: { productId, quantity },
    }),

  updateQuantity: (productId, quantity) =>
    apiRequest("/cart", {
      method: "PUT",
      body: { productId, quantity },
    }),

  removeItem: (productId) =>
    apiRequest(`/cart/${productId}`, {
      method: "DELETE",
    }),

  clearCart: () =>
    apiRequest("/cart", {
      method: "DELETE",
    }),
};

// -------------------------------------------------------------
// Orders API
// -------------------------------------------------------------
export const orderAPI = {
  createOrder: (orderData) =>
    apiRequest("/orders", {
      method: "POST",
      body: orderData,
    }),

  getMyOrders: () => apiRequest("/orders/my-orders"),

  getById: (id) => apiRequest(`/orders/${id}`),

  getFarmerOrders: () => apiRequest("/orders/farmer"),

  getSupplierOrders: () => apiRequest("/orders/supplier"),

  updateStatus: (id, status) =>
    apiRequest(`/orders/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
};

// -------------------------------------------------------------
// Deliveries API
// -------------------------------------------------------------
export const deliveryAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/deliveries${query ? `?${query}` : ""}`);
  },

  getById: (id) => apiRequest(`/deliveries/${id}`),

  create: (deliveryData) =>
    apiRequest("/deliveries", {
      method: "POST",
      body: deliveryData,
    }),

  update: (id, deliveryData) =>
    apiRequest(`/deliveries/${id}`, {
      method: "PATCH",
      body: deliveryData,
    }),

  updateStatus: (id, status) =>
    apiRequest(`/deliveries/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),

  assignTransporter: (id, transporterId) =>
    apiRequest(`/deliveries/${id}/assign`, {
      method: "PATCH",
      body: { transporterId },
    }),
};

// -------------------------------------------------------------
// Notifications API
// -------------------------------------------------------------
export const notificationAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/notifications${query ? `?${query}` : ""}`);
  },

  markAsRead: (id) =>
    apiRequest(`/notifications/${id}/read`, {
      method: "PATCH",
    }),

  markAllAsRead: () =>
    apiRequest("/notifications/read-all", {
      method: "PATCH",
    }),

  delete: (id) =>
    apiRequest(`/notifications/${id}`, {
      method: "DELETE",
    }),

  getPreferences: () => apiRequest("/notifications/preferences"),

  updatePreferences: (preferences) =>
    apiRequest("/notifications/preferences", {
      method: "PUT",
      body: preferences,
    }),
};

// -------------------------------------------------------------
// Admin API
// -------------------------------------------------------------
export const adminAPI = {
  getDashboard: () => apiRequest("/admin/dashboard"),

  getUsers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/admin/users${query ? `?${query}` : ""}`);
  },

  updateUserStatus: (id, status) =>
    apiRequest(`/admin/users/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),

  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/admin/products${query ? `?${query}` : ""}`);
  },

  updateProductStatus: (id, status) =>
    apiRequest(`/admin/products/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),

  getOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/admin/orders${query ? `?${query}` : ""}`);
  },
};

// -------------------------------------------------------------
// AI Services API
// -------------------------------------------------------------
export const aiAPI = {
  cropRecommendation: (data) =>
    apiRequest("/ai/crop-recommendation", {
      method: "POST",
      body: data,
    }),

  diseaseDetection: (data) =>
    apiRequest("/ai/disease-detection", {
      method: "POST",
      body: data,
    }),

  pricePrediction: (data) =>
    apiRequest("/ai/price-prediction", {
      method: "POST",
      body: data,
    }),

  advisor: (data) =>
    apiRequest("/ai/advisor", {
      method: "POST",
      body: data,
    }),
};

// -------------------------------------------------------------
// File Upload API
// -------------------------------------------------------------
export const uploadAPI = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return apiRequest("/upload", {
      method: "POST",
      body: formData,
    });
  },
};

export default {
  auth: authAPI,
  products: productAPI,
  cart: cartAPI,
  orders: orderAPI,
  deliveries: deliveryAPI,
  notifications: notificationAPI,
  admin: adminAPI,
  ai: aiAPI,
  upload: uploadAPI,
};
