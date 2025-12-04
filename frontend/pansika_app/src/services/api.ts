import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Change this to match your machine's IP when testing on a phone.
export const API_BASE_URL = "https://leonard-nonaccrued-fusibly.ngrok-free.dev/api/";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
});

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach token to every request if present.
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthService = {
  login: async (emailOrUsername: string, password: string) => {
    // JWT expects username, so allow either email or username.
    const username = emailOrUsername;
    const response = await api.post("auth/login/", { username, password });
    return response.data;
  },
  register: async (payload: {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
  }) => {
    const response = await axios.post(`${API_BASE_URL}auth/register/`, payload, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  },
  profile: async () => {
    const response = await api.get("auth/profile/");
    return response.data;
  }
};

export const StoreService = {
  list: async () => (await api.get("stores/")).data
};

export const CategoryService = {
  list: async () => (await api.get("categories/")).data
};

export const ProductService = {
  list: async (params?: { store?: number; category?: number; search?: string }) =>
    (await api.get("products/", { params })).data,
  detail: async (id: number) => (await api.get(`products/${id}/`)).data
};

export const OrderService = {
  create: async (payload: {
    delivery_address: string;
    payment_method: string;
    items: { product_id: number; quantity: number }[];
  }) => (await api.post("orders/", payload)).data,
  list: async () => (await api.get("orders/")).data,
  detail: async (id: number) => (await api.get(`orders/${id}/`)).data
};

export default api;
