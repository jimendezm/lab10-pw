import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { GET_PRODUCT_DETAIL } from '../graphql/queries';
import '../styles/ProductModal.css';

const ProductModal = ({ product, format, onClose }) => {
  const [showRaw, setShowRaw] = useState(false);
  
  // Fetch detalle del producto cuando se abre el modal
  const { data, loading, error } = useApi(
    GET_PRODUCT_DETAIL,
    { id: product?.id },
    { format }
  );

  const detailedProduct = data?.producto;

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{product.name}</h2>
          <button 
            className="raw-toggle"
            onClick={() => setShowRaw(!showRaw)}
          >
            {showRaw ? 'Vista Normal' : 'Vista Raw'}
          </button>
        </div>

        {loading && (
          <div className="modal-loading">Cargando detalles...</div>
        )}

        {error && (
          <div className="modal-error" role="alert">
            Error: {error}
          </div>
        )}

        {!loading && !error && detailedProduct && (
          <div className="modal-body">
            {showRaw ? (
              <pre className="raw-data">
                {JSON.stringify(detailedProduct, null, 2)}
              </pre>
            ) : (
              <div className="product-details">
                <div className="detail-group">
                  <label>ID:</label>
                  <span>{detailedProduct.id}</span>
                </div>
                <div className="detail-group">
                  <label>SKU:</label>
                  <span>{detailedProduct.sku}</span>
                </div>
                <div className="detail-group">
                  <label>Nombre:</label>
                  <span>{detailedProduct.name}</span>
                </div>
                <div className="detail-group">
                  <label>Precio:</label>
                  <span>${detailedProduct.price}</span>
                </div>
                <div className="detail-group">
                  <label>Stock:</label>
                  <span>{detailedProduct.stock}</span>
                </div>
                <div className="detail-group">
                  <label>Categoría:</label>
                  <span>{detailedProduct.category}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;