// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GoogleProductList from './GoogleProductList';
import YourCart from './YourCart';
import YourProfile from './YourProfile';
import ProductData from "./Constant/productData";
import LoginPage from './LoginPage';
import Checkout from './checkout';
import OrderPage from './OrderPage';

const Footer = () => {
  return (

    <footer style={{ backgroundColor: 'antiquewhite', padding: '30px 0',position:'fixed', textAlign: 'center', bottom: 0, width: '100%' }}>
      <div className="container">
        <span>© 2024 Google Store. All rights reserved. | Created by Kush Patel || Student ID: 8930000</span>
      </div>
    </footer>
    );
};
const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ shippingAddress: '' });
  const [userLogged, setuserLogged] = useState(false);
  const allGoogleProducts = ProductData();

  

  const addToCart = (productId) => {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    if (existingItemIndex !== -1) {
      
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      
      const productToAdd = allGoogleProducts.find(product => product._id === productId);
      if (productToAdd) {
        setCart([...cart, { ...productToAdd, quantity: 1 }]);
      }
    }
  };
  const isLogged = () => {
    setuserLogged(true);
  };
  const isNotLogeed = () => {
    setuserLogged(false);
    localStorage.setItem("userID","");
  };
  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const finalizePurchase = () => {
    setCart([]);
    alert('Purchase finalized!');
  };



  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1 style={{textAlign:'center'}}>Google Store</h1>
          
        </header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex gap-4 justify-content-center">
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/YourCart" className='nav-link'>Your Cart</Link>
            <Link to="/AllOrders" className='nav-link'>Orders</Link>
           { !userLogged &&   
              <Link to="/LoginPage" className='nav-link'>Login</Link>
            
            }
            { userLogged && ( <button onClick={isNotLogeed} style={{textAlign:'right'}}>Logout</button>
            )
            }

           
          </nav>
        <Routes>
          <Route path="/" element={<GoogleProductList products={allGoogleProducts} />} />
          <Route path="/YourCart" element={<YourCart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} finalizePurchase={finalizePurchase} />} />
          <Route path="/YourProfile" element={<YourProfile onLogin={isLogged} />} />
          <Route path="/LoginPage" element={<LoginPage onLogin={isLogged} />} />
          <Route path="/checkout" element={ <Checkout/>} />
          <Route path="/AllOrders" element={ <OrderPage/>} />
          
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
