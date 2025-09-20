"use client";

import api from "@/lib/api";
import { createContext, useContext, useState, ReactNode } from "react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: "gestor" | "tecnico";
}

type AuthContextType = {
  user: Usuario | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Função de login chamando sua API
  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post("/auth/login", { email, senha });

      // Exemplo de retorno da API:
      const { usuario, access_token } = response.data;

      setUser(usuario);
      setToken(token);

      // Salvar no localStorage para manter sessão
      localStorage.setItem("user", JSON.stringify(usuario));
      localStorage.setItem("token", access_token);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
