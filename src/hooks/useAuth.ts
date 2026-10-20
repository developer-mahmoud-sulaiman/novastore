import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import type { LoginFormData } from "../lib";
import { authService } from "../services/auth";

export function useAuth() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const setAuth = useAuthStore((state) => state.setAuth)
    const logout = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.user)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    const login = async (credintials: LoginFormData) => {
        setIsLoading(true)
        setError(null)

        try 
        {
            const response = await authService.login(credintials)

            const user = {
                id: response.id,
                username: response.username,
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                gender: response.gender,
                image: response.image
            }

            setAuth(user, response.accessToken)

            const from = (location.state as {from?: string})?.from || '/';
            navigate(from, {replace: true})

            return true
        }
        catch (err) 
        {
            setError(err instanceof Error ? err.message : 'Login Failed')
            return false
        }
        finally
        {
            setIsLoading(false)
        }

    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return {user, isAuthenticated, login, logout, handleLogout, isLoading, error}


}
