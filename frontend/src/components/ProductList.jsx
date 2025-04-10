import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Ошибка при получении товаров:", error);
      });
  }, []);

  return (
    <div>
      <h2>Товары</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price} Сом</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;