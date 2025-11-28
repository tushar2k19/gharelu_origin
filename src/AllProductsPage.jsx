import React, { useState } from 'react';
import { COLORS } from './constants';
import AllProductsGrid from './AllProductsGrid';
import ProductDetailModal from './ProductDetailModal';

const AllProductsPage = ({ cart, addToCart, updateQuantity, removeFromCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: COLORS.cream }}>
       <div className="max-w-7xl mx-auto px-6">
        <h2 
          className="text-3xl md:text-5xl font-serif font-bold mb-8 text-center"
          style={{ color: COLORS.darkGreen }}
        >
          All Products
        </h2>
        
        <AllProductsGrid onProductClick={handleProductClick} />
        
        <ProductDetailModal 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          onAddToCart={addToCart}
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      </div>
    </div>
  );
};

export default AllProductsPage;

