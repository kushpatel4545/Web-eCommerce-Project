import { useState, useEffect } from "react";

function ProductData() {
  const [goggleProducts, setGoogleProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/product/googleProduct");
        if (response.ok) {
          const data = await response.json();
          setGoogleProducts(data); 
        } else {
          throw new Error("Failed to fetch Product data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, []); 

  return goggleProducts;
}

export default ProductData;
