"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, senha);
      router.push("/dashboard"); // redireciona após login
    } catch {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-row items-center w-full max-w-4xl ml-6 mr-6">
        <form onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          {erro && <p className="text-red-500 mb-4">{erro}</p>}

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
        <Image
          src="/img_login.png"
          alt="Imagem de Login"
          width={300}
          height={300}
          className="mb-8 hidden md:block"
          priority
        />
      </div>
    </div>
  );
}
