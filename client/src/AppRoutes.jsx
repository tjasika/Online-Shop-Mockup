import { Routes, Route, Navigate } from 'react-router-dom';
import Details from './Components/Details.jsx';
import Cart from './Components/Cart.jsx';
import Saved from './Components/Saved.jsx';
import Login from './Components/Login.jsx';
import App from './App.jsx';
import Signup from './Components/Signup.jsx';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<Details />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}