import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => {
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("authChange")); // Notify components of auth change
};

export const removeToken = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange")); // Notify components of logout
};

export const getUserRole = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
    } catch (error) {
        return null;
    }
};

export const isAuthenticated = () => !!getToken();

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(isAuthenticated());

    useEffect(() => {
        const handleAuthChange = () => {
            setAuthenticated(isAuthenticated());
        };

        window.addEventListener("authChange", handleAuthChange);
        return () => window.removeEventListener("authChange", handleAuthChange);
    }, []);

    return authenticated;
};
