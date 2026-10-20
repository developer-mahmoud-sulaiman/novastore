import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/user";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            setAuth: (user, token) => 
                set({user, token, isAuthenticated: true}),

            logout: () => 
                set({user: null, token: null, isAuthenticated: false}),
        }),
        {
            name: 'nova-store'
        }
    )
)

export const selectUser = (state: AuthState) => state.user;
export const selectIsAuth = (state: AuthState) => state.isAuthenticated;
export const selectToken = (state: AuthState) => state.token;
