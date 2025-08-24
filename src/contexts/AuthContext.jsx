import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { signIn as apiSignIn, signUp as apiSignUp } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("userInfo");
    if (t && u) {
      setToken(t);
      try {
        setUser(JSON.parse(u));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = async ({ login, password }) => {
    setIsAuthLoading(true);
    try {
      const res = await apiSignIn({ login, password });
      const t = res.token || res.user?.token;
      const u = res.user || res;
      if (!t) throw new Error("Не получен токен");
      setToken(t);
      setUser(u);
      localStorage.setItem("token", t);
      localStorage.setItem("userInfo", JSON.stringify(u));
      return u;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const register = async ({ name, login, password }) => {
    setIsAuthLoading(true);
    try {
      const res = await apiSignUp({ name, login, password });
      const t = res.token || res.user?.token;
      const u = res.user || res;
      if (!t) throw new Error("Не получен токен");
      setToken(t);
      setUser(u);
      localStorage.setItem("token", t);
      localStorage.setItem("userInfo", JSON.stringify(u));
      return u;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isAuth");
  };

  const isAuth = Boolean(token && user);

  const value = useMemo(
    () => ({ user, token, isAuth, isAuthLoading, login, register, logout }),
    [user, token, isAuth, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}