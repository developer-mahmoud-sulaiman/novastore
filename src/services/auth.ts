import { api } from "../lib";
import type { AuthResponse, LoginCredintials, User } from "../types/user";

export const authService = {
  async login(credintials: LoginCredintials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", {
      ...credintials,
      expiresInMins: 60,
    });

    return data;
  },

  async getCurrentUser(token: string): Promise<User> {
    const { data } = await api.get<User>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  },
};
