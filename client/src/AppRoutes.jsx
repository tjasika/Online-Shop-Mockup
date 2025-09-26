import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Details from './Components/Details.jsx';
import Cart from './Components/Cart.jsx';
import Saved from './Components/Saved.jsx';
import Login from './Components/Login.jsx';
import App from './App.jsx';
import Signup from './Components/Signup.jsx';
import Account from './Components/Account.jsx';

export const AppRoutes = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkSession = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/check-session', { withCredentials: true });
          if (response.data.isLoggedIn) {
            setUser(response.data.user);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.log('No active session');
        } finally {
          setIsLoading(false);
        }
      };

      checkSession();
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
    };

    const handleLogout = async () => {
      if (window.confirm("Log Out?")) {
        try {
          await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
          setUser(null);
          setIsLoggedIn(false);
          navigate('/');
        } catch (error) {
          console.log('Logout error:', error);
        }
      }
      
    };

    return (
        <Routes>
            <Route path="/" element={<App user={user} isLoggedIn={isLoggedIn}/>} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account user={user} onLogout={handleLogout}/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<Details />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}