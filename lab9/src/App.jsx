import React, { useState, useEffect } from 'react';
import ControlsBar from './components/ControlBars';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import { useApi } from './hooks/useApi';
import { GET_PRODUCTS, GET_PRODUCT_DETAIL } from './graphql/queries';
import './App.css';

function App() {
  const [format, setFormat] = useState('application/json');
  const [pageSize, setPageSize] = useState(12);
  const [sortBy, setSortBy] = useState('name:asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Usar GraphQL para obtener productos
  const { data: productsData, loading, error, refetch } = useApi(
    GET_PRODUCTS,
    { page: currentPage, limit: pageSize },
    { format }
  );

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Ordenamiento en cliente
  const getSortedProducts = (products) => {
    if (!products) return [];
    
    const [field, direction] = sortBy.split(':');
    
    return [...products].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const products = productsData?.productos || [];
  const sortedProducts = getSortedProducts(products);

  // Calcular páginas totales (aproximado)
  const totalPages = Math.ceil((productsData?.total || 100) / pageSize);

  useEffect(() => {
    refetch();
  }, [currentPage, pageSize, format]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Catálogo de Productos</h1>
        <p>Laboratorio 10 - Consumo de API GraphQL</p>
      </header>

      <main className="app-main">
        <ControlsBar
          format={format}
          onFormatChange={handleFormatChange}
          pageSize={pageSize.toString()}
          onPageSizeChange={handlePageSizeChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
        
        <ProductList
          products={sortedProducts}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onProductClick={handleProductClick}
        />

        {showModal && (
          <ProductModal
            product={selectedProduct}
            format={format}
            onClose={handleCloseModal}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>IC8057 - Introducción al Desarrollo de Páginas Web</p>
      </footer>
    </div>
  );
}

export default App;