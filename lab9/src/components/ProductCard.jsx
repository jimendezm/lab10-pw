import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="no-image">Sin imagen</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-sku">SKU: {product.sku}</p>
        
        {product.price && (
          <p className="product-price">
            ${typeof product.price === 'number' 
              ? product.price.toFixed(2) 
              : product.price}
          </p>
        )}
        
        {product.category && (
          <span className="product-category">{product.category}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;