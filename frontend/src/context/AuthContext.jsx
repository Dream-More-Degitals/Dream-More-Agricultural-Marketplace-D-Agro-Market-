import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [activeRole, setActiveRole] = useState(() => localStorage.getItem("activeRole") || null);
  const [loading, setLoading] = useState(true);

  // Synchronize and verify current user with backend on startup
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await authAPI.getMe();
        if (res && res.success && res.user) {
          const freshUser = res.user;
          setUser(freshUser);
          localStorage.setItem("user", JSON.stringify(freshUser));
          localStorage.setItem("isLoggedIn", "true");

          // Keep activeRole valid
          const currentActive = localStorage.getItem("activeRole");
          if (!currentActive || !freshUser.roles?.includes(currentActive)) {
            const defaultRole = freshUser.roles?.[0] || "buyer";
            setActiveRole(defaultRole);
            localStorage.setItem("activeRole", defaultRole);
          }
        }
      } catch (err) {
        console.warn("[Auth] Session validation failed or server offline:", err.message);
        // If 401 Unauthorized, token is expired/invalid
        if (err.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async ({ email, password }) => {
    const res = await authAPI.login({ email, password });
    if (res && res.success) {
      const { token: receivedToken, user: loggedUser } = res;
      setToken(receivedToken);
      setUser(loggedUser);

      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("isLoggedIn", "true");
      if (loggedUser.profile) {
        localStorage.setItem("profile", JSON.stringify(loggedUser.profile));
      }

      const initialRole = loggedUser.roles?.[0] || "buyer";
      setActiveRole(initialRole);
      localStorage.setItem("activeRole", initialRole);

      return loggedUser;
    }
    throw new Error(res?.message || "Login failed");
  };

  const register = async (userData) => {
    const res = await authAPI.register(userData);
    if (res && res.success) {
      const { token: receivedToken, user: registeredUser } = res;
      setToken(receivedToken);
      setUser(registeredUser);

      localStorage.setItem("token", receivedToken);
      localStorage.setItem("user", JSON.stringify(registeredUser));
      localStorage.setItem("isLoggedIn", "true");
      if (registeredUser.profile) {
        localStorage.setItem("profile", JSON.stringify(registeredUser.profile));
      }

      const initialRole = registeredUser.roles?.[0] || "buyer";
      setActiveRole(initialRole);
      localStorage.setItem("activeRole", initialRole);

      return registeredUser;
    }
    throw new Error(res?.message || "Registration failed");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setActiveRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("activeRole");
    localStorage.removeItem("profile");
  };

  const updateProfile = async (profileData) => {
    const res = await authAPI.updateProfile(profileData);
    if (res && res.success && res.user) {
      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      if (res.user.profile) {
        localStorage.setItem("profile", JSON.stringify(res.user.profile));
      }
      return res.user;
    }
    throw new Error(res?.message || "Failed to update profile");
  };

  const switchRole = (role) => {
    if (user?.roles?.includes(role)) {
      setActiveRole(role);
      localStorage.setItem("activeRole", role);
    }
  };

  const value = {
    user,
    token,
    activeRole,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
    updateProfile,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
