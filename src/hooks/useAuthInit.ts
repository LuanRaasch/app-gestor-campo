// src/hooks/useAuthInit.ts
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import api from "@/lib/api";

export function useAuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadUser() {
      try {
        const { data } = await api.get("/auth/profile");
        dispatch(setUser(data));
      } catch {
        dispatch(setUser(null));
      }
    }
    loadUser();
  }, [dispatch]);
}
