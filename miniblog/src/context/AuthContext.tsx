import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const USER_KEY = "miniblog_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  // Đọc từ localStorage để F5 không bị đăng xuất
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "123456") {
      const u: User = { username };
      setUser(u);
      localStorage.setItem(USER_KEY, JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải được dùng bên trong AuthProvider");
  return ctx;
}