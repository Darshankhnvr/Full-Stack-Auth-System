import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                try {
                    const res = await API.get('/auth/me')
                    setUser(res.data.user || res.data)
                } catch (error) {
                    logout();
                }
            }
            setLoading(false);
        }
        verifyUser();
    }, [token]);

    const login = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('token', tokenData);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token')
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, setLoading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}