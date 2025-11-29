import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { COLORS } from './constants';
import AllProductsGrid from './AllProductsGrid';
import ProductDetailModal from './ProductDetailModal';

const SectionHeading = ({ children, align = "center", className = "" }) => (
  <div className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-start'} ${className}`}>
    <h2
      className="text-2xl md:text-4xl font-serif font-bold"
      style={{ color: COLORS.darkGreen }}
    >
      {children}
    </h2>
    {align === 'center' ? (
      <div className="mt-2 flex items-center gap-3">
        <div className="w-12 h-px" style={{ backgroundColor: `${COLORS.goldenYellow}B3` }} />
        <Leaf className="text-golden-yellow" size={20} strokeWidth={2} style={{ color: COLORS.goldenYellow }} />
        <div className="w-12 h-px" style={{ backgroundColor: `${COLORS.goldenYellow}B3` }} />
      </div>
    ) : (
      <div className="mt-2 flex items-center gap-3">
        <Leaf className="text-golden-yellow" size={20} strokeWidth={2} style={{ color: COLORS.goldenYellow }} />
        <div className="w-24 h-px" style={{ backgroundColor: `${COLORS.goldenYellow}B3` }} />
      </div>
    )}
  </div>
);

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
        <SectionHeading align="center" className="mb-8">
          All Products
        </SectionHeading>
        
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

