import React, { useState, useEffect } from 'react';
import ProductData from "./Constant/productData";

const GoogleProductList = () => {
  const [cart, setCart] = useState({
    productID: "",
    quantity: 1
  });

  const allGoogleProducts = ProductData();

  const addToCart = async (productId) => {
    const product = allGoogleProducts.find(product => product._id === productId);
    if (product) {
      let cartItem = {
        cartProductID: product._id,
        productQty: parseInt(cart.quantity)  
      };

      await addProductToCart(cartItem);
    }
  };

  const addProductToCart = async (cartItem) => {
    try {
      const response = await fetch("http://localhost:8000/api/cart/createGoogleCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        alert("Cart Added Success;");
      } else {
        throw new Error("Failed to add item to cart.");
      }

    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="container" style={{marginBottom:'120px'}}>
      <h1 className='heading'>Google Product List</h1>
      <div className="row">
        {allGoogleProducts && allGoogleProducts.map(product => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.productImage} className="Card-top" style={{width:'200px', height:'200px'}} alt={product.productImage} />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
                <span className="price">$ {product.productPrice}</span>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setCart(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                  defaultValue={1}
                  min={1}
                />
                <button className="btn btn-primary mt-4" style={{backgroundColor:'green'}}onClick={() => addToCart(product._id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleProductList;
