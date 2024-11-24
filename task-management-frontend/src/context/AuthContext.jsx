import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                logout();
            }  
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
           
            localStorage.setItem('token', response.token);

            const decodedToken = jwtDecode(response.token);
            setUser({
                id: response.userId,
                email: response.userId,
                role: 0,
                fullName: response.userId,
                isAdmin:response.isAdmin
            });

            toast.success('Başarıyla giriş yapıldı');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Giriş yapılırken bir hata oluştu');
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await authService.register(userData);
            toast.success('Kayıt başarılı, lütfen giriş yapın');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Kayıt olurken bir hata oluştu');
            throw error;
        }
    };

    const logout = () => {
       localStorage.removeItem('token');
        setUser(null);
      navigate('/login');
       toast.success('Başarıyla çıkış yapıldı.');
    };

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'Admin'
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

