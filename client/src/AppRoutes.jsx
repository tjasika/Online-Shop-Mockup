import { Routes, Route, Navigate } from 'react-router-dom';
import Details from './Components/Details.jsx';
import App from './App.jsx';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/products/:id" element={<Details />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}