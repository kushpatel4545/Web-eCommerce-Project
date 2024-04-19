import React, { useEffect, useState } from 'react'

const OrderPage = () => {
    const [productAllData, setProductAllData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/order/googleOrder");
                if (response.ok) {
                    const data = await response.json();
                    setProductAllData(data); 
                } else {
                    throw new Error("Failed to  fetch Order data");
                }
            } catch (error) {
                console.error("Error fetching Order data:", error);
            }
        };

        fetchData(); 
    }, []);

    return (

     
        <div>

            <div className="container" style={{ width: '750px',marginBottom:'120px' }}>
                <h2 className="mt-4" style={{textAlign:'center'}}>Order Details</h2>
                {productAllData && productAllData?.map((product, index) => (
                    <div className="card mb-4" key={index}>
                        <div className="card-body">
                            <h2 className="card-title">Order Number: {product._id}</h2>
                            <h3 className="card-subtitle mb-2 text-muted">Order Total: ${product.orderTotal}</h3>
                            <h3 className="mt-3">Product Names:</h3>
                            <ul className="list-group">
                                {product?.orderProductID?.map((productdetails) => (
                                    <li className="list-group-item" key={productdetails._id}>{productdetails.productName}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default OrderPage