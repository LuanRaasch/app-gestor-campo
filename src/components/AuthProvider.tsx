// src/components/AuthProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useAuthInit } from "@/hooks/useAuthInit";

export default function AuthProvider({ children }: { children: ReactNode }) {
  useAuthInit();
  return <>{children}</>;
}
