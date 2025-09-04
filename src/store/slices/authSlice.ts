import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: "gestor" | "tecnico";
}

interface AuthState {
  user: Usuario | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true, // enquanto carrega perfil inicial
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Usuario | null>) {
      state.user = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
