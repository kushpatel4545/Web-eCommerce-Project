import React, { createContext, useState } from "react";
import ProductData from "../Constant/productData";

// Create the context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
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

    const updateQuantity = (productId, quantity) => {
        const updatedCart = cart.map(item => {
            if (item.id === productId) {
                return { ...item, quantity };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const contextValue = {
        cart,
        addToCart,
        updateQuantity
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}
