import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import db from "../firebase/firebaseConfig";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const listingsRef = ref(db, "listings");
    const unsubscribe = onValue(listingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Flatten all listings from all farmers into a single array
        const allProducts = Object.values(data)
          .flatMap(farmerListings => Object.values(farmerListings));
        setProducts(allProducts);
      } else {
        setProducts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((item, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                width: "220px",
                background: "#fafafa",
              }}
            >
              {item.photo && (
                <img
                  src={item.photo}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              )}
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <p style={{ fontSize: "0.9em" }}>{item.description}</p>
              <p style={{ fontSize: "0.8em", color: "#888" }}>
                Listed by: {item.listby}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;