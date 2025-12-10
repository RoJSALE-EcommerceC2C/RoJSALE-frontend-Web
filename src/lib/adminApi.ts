// =============================
// 🔐 ADMIN API CLIENT (FINAL)
// =============================

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach admin token for ALL axios requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export type AdminApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

// Get stored token from localStorage
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

// Base fetch wrapper for all admin routes (KEEP UNTOUCHED)
export async function adminApi<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<AdminApiResponse<T>> {
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers,
  });

  return res.json();
}

// =============================
// 👥 USERS
// =============================

export const getAllUsers = async (
  page = 1,
  limit = 10,
  search = "",
  status = ""
) =>
  adminApi(
    `/api/admin/users?page=${page}&limit=${limit}&search=${search}&status=${status}`
  );

export const getUserById = async (id: string) =>
  adminApi(`/api/admin/users/${id}`);

export const updateUserStatus = async (id: string, status: string) =>
  adminApi(`/api/admin/users/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });

export const updateUserVerification = async (
  id: string,
  verificationStatus: string
) =>
  adminApi(`/api/admin/users/${id}/verification`, {
    method: "PUT",
    body: JSON.stringify({ verificationStatus }),
  });

// =============================
// 📦 PRODUCTS
// =============================

export const getAllProducts = async (
  page = 1,
  limit = 10,
  search = "",
  status = "",
  category = ""
) =>
  adminApi(
    `/api/admin/products?page=${page}&limit=${limit}&search=${search}&status=${status}&category=${category}`
  );

export const updateProductStatus = async (id: string, isActive: boolean) =>
  adminApi(`/api/admin/products/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ isActive }),
  });

// =============================
// 📦 ORDERS
// =============================

export const getAllOrders = async (page = 1, limit = 10, status = "") =>
  adminApi(`/api/admin/orders?page=${page}&limit=${limit}&status=${status}`);

// =============================
// 📊 DASHBOARD
// =============================

export const getAdminDashboardStats = async () =>
  adminApi(`/api/admin/dashboard`);

// =============================
// 🔄 AUTO REFRESH UTILITY
// =============================

export function autoRefresh(callback: Function, minutes = 1) {
  callback(); // Initial fetch
  setInterval(() => {
    console.log(`🔄 Auto-refreshing admin data (${minutes} min interval)`);
    callback();
  }, minutes * 60 * 1000);
}

// =============================
// 📁 CATEGORIES
// (Untouched except token interceptor added)
// =============================

export async function getAllCategories(page = 1, limit = 100) {
  try {
    const res = await api.get(`/api/categories`);
    return res.data;
  } catch (error: any) {
    return (
      error.response?.data || {
        success: false,
        message: "Error fetching categories",
      }
    );
  }
}

export async function createCategory(data: any) {
  try {
    const res = await api.post(`/api/categories`, data);
    return res.data;
  } catch (error: any) {
    return (
      error.response?.data || {
        success: false,
        message: "Error creating category",
      }
    );
  }
}

// =============================
// 📊 REPORT FUNCTIONS (FIXED)
// =============================

// USERS
export async function getAllUsersForReports(page = 1, limit = 5000) {
  try {
    const res = await api.get("/api/admin/users", {
      params: { page, limit },
    });
    return res.data;
  } catch (error: any) {
    return error.response?.data || { success: false };
  }
}

// PRODUCTS
export async function getAllProductsForReports(page = 1, limit = 5000) {
  try {
    const res = await api.get("/api/admin/products", {
      params: { page, limit },
    });
    return res.data;
  } catch (error: any) {
    return error.response?.data || { success: false };
  }
}

// CATEGORIES
export async function getCategoriesForReports() {
  try {
    const res = await api.get("/api/categories");
    return res.data;
  } catch (error: any) {
    return error.response?.data;
  }
}

// DASHBOARD STATS
export async function getDashboardStatsForReports() {
  try {
    const res = await api.get("/api/admin/dashboard");
    return res.data;
  } catch (error: any) {
    return error.response?.data;
  }
}
// =============================
// 👤 CREATE EMPLOYEE (ADMIN ONLY)
// =============================
export const createEmployee = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: "ADMIN" | "MANAGER" | "SUPPORT";
}) =>
  adminApi("/api/admin/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
