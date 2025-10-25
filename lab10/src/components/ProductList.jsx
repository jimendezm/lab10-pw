import React from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import Skeleton from './Skeleton';
import '../styles/ProductList.css';

const ProductList = ({
  products,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  onProductClick
}) => {
  // Renderizar skeletons mientras carga
  if (loading) {
    return (
      <div className="product-list-container">
        <div className="products-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Renderizar mensaje de error
  if (error) {
    return (
      <div className="error-state">
        <div className="error-message" role="alert">
          <h3>Error al cargar los productos</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Renderizar estado vacío
  if (!products || products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No hay productos para mostrar.</h3>
        <p>Intenta cambiar los filtros o la página.</p>
      </div>
    );
  }

  // Renderizar listado normal
  return (
    <div className="product-list-container">
      {/* Información de página actual */}
      <div className="page-info">
        Página {currentPage} de {totalPages} - {products.length} productos
      </div>

      {/* Grid de productos */}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id || product.sku}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductList;