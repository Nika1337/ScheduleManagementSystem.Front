import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
            removeToken();
            return null;
        }
        return token;
    } catch (error) {
        removeToken();
        return null;
    }
};
export const setToken = (token) => {
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("authChange"));
};

export const removeToken = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
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

export const getUserEmail = () => {
    const token = getToken();
    if (!token) return null;
    try {
        const decoded = jwtDecode(token);
        return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || null;
    } catch (error) {
        return null;
    }
};

export const isAuthenticated = () => !!getToken();

export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(isAuthenticated());
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthChange = () => {
            const authStatus = isAuthenticated();
            setAuthenticated(authStatus);
            if (!authStatus) {
                navigate("/login", { replace: true });
            }
        };

        window.addEventListener("authChange", handleAuthChange);
        return () => window.removeEventListener("authChange", handleAuthChange);
    }, [navigate]);

    const logout = () => {
        removeToken();
    };

    return { authenticated, logout };
};
