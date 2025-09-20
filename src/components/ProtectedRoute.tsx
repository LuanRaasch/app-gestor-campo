"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // 🔒 manda para login se não logado
    }
  }, [user, router]);

  if (!user) {
    return <p className="text-center mt-10">Redirecionando...</p>;
  }

  return <>{children}</>;
}
