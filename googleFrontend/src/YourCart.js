import React, { useEffect, useState } from 'react';
import './App.css';
import {  useNavigate } from 'react-router-dom';

const YourCart = () => {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  let  userID = localStorage.getItem("userID");
  const navigate = useNavigate();
  // Function to calculate the total price
  const calculateTotal = () => {
    return cartData.reduce((total, item) => total + item.cartProductID.productPrice * item.productQty, 0).toFixed(2);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/cart/googleCart");
      if (response.ok) {
        const data = await response.json();
        setCartData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = async (deleteCartID) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cart/deleteGoogleCart/${deleteCartID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        alert('Cart item deleted successfully');
        fetchData();
      } else {
        throw new Error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  
  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [cartData]);

  const createOrder = async () => {
    if(userID!==""){
    try {
      const productIds = cartData.map(item => item.cartProductID._id); 
      const orderData = { orderProductID: productIds, orderTotal: totalPrice }; 
      const response = await fetch("http://localhost:8000/api/order/createGoogleOrder", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData), 
      });
      if (response.ok) {
        navigate("/checkout");
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }else{
    alert("Please login!!!");
  }
  };

  return (
    <div className="container-fluid bg-light" style={{marginBottom:'120px'}} id='cont'>
      <h1 className="heading">Your Cart.</h1>
      <div className="row ms-5">
        <div className="col-md-5">
          {cartData?.map(item => (
            <div key={item._id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={item.cartProductID.productImage} className="img-fluid rounded-start" alt={item.productName} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.cartProductID.productName}</h5>
                    <p className="card-text">Quantity: {item.productQty}</p>
                    <p className="card-text">Price: ${item.cartProductID.productPrice}</p>
                    <button className="btn btn-outline-danger" id='removebutton' onClick={() => removeFromCart(item._id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Price</h5>
              <p className="card-text">Total Price: ${totalPrice}</p> 
              <button className="btn btn-primary" onClick={createOrder}>Finalize Purchase</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCart;
