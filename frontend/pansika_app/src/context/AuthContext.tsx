import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "../services/api";

type User = {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (payload: { username: string; email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set to true if you want to bypass backend auth and see the app right away.
  const DEMO_MODE = true;
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, load any saved session.
    const bootstrap = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const profile = await AuthService.profile();
          setUser(profile);
        } catch (e) {
          // Invalid token, wipe it.
          await AsyncStorage.removeItem("token");
          setToken(null);
        }
      } else if (DEMO_MODE) {
        // Demo: skip auth and enter the app immediately.
        const demoUser = { id: 0, username: "demo", email: "demo@example.com" };
        setUser(demoUser);
        setToken("demo-token");
        await AsyncStorage.setItem("token", "demo-token");
      }
      setLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await AuthService.login(email, password);
      const access = data.access;
      await AsyncStorage.setItem("token", access);
      setToken(access);
      const profile = await AuthService.profile();
      setUser(profile);
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async (payload: { username: string; email: string; password: string }) => {
    try {
      await AuthService.register(payload);
      // Auto-login after registration
      return login(payload.username, payload.password);
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
