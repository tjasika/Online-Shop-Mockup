import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Details from './Components/Details.jsx';
import Cart from './Components/Cart.jsx';
import Login from './Components/Login.jsx';
import App from './App.jsx';
import Signup from './Components/Signup.jsx';
import Account from './Components/Account.jsx';

export const AppRoutes = () => {
    const navigate = useNavigate();

    //State Variables
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[cartItems, setCartItems] = useState([]);

    useEffect(() => {
      const checkSession = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/check-session', { withCredentials: true });
          if (response.data.isLoggedIn) {
            setUser(response.data.user);
            setIsLoggedIn(true);

            const cartResponse = await axios.get(`http://localhost:5000/api/cart/${response.data.user.id}`);
            setCartItems(cartResponse.data);
          }
        } catch (error) {
          console.log('No active session');
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

    const addToCart = async (product, sizeId, colorId, quantity = 1) => {
      if(!isLoggedIn) {
        alert('Please log in to add items to cart.');
        return;
      }

      try {
        await axios.post('http://localhost:5000/api/cart', {
          customerId: user.id,
          productId: product.id,
          sizeId,
          colorId,
          quantity
        });

        const cartResponse = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
        setCartItems(cartResponse.data);
        alert('Item added to cart!');
      } catch(err) {
        if(err) {
          console.error('Add to cart error:', err);
          alert('Failed to add item to cart');
        }
      }
    }

    const removeFromCart = async (cartItemId) => {
      try {
        await axios.delete(`http://localhost:5000/api/cart/${cartItemId}`);
        const cartResponse = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
        setCartItems(cartResponse.data);

      } catch(err) {
        if(err) {
          console.error('Remove from cart error:', err);
          alert('Failed to remove item from cart');
        }
      }
    }

    const updateQuantity = async (cartItemId, newQuantity) => {
      try {
        await axios.put(`http://localhost:5000/api/cart/${cartItemId}`, {
          quantity: newQuantity,
        });
        const cartResponse = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
        setCartItems(cartResponse.data);

      } catch(err) {
        if(err) {
          console.error('Update error:', err);
          alert('Failed to update quantity.');
        }
      }
    }

    return (
        <Routes>
            <Route path="/" element={<App user={user} isLoggedIn={isLoggedIn}/>} />
            <Route path="/saved" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account user={user} onLogout={handleLogout}/>} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity}/>} />
            <Route path="/products/:id" element={<Details addToCart={addToCart}/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
  }