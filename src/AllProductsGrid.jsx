import React from 'react';
import { COLORS, PRODUCTS } from './constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AllProductsGrid = ({ onProductClick }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="h-full">
            <div 
              onClick={() => onProductClick(product)}
              className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl overflow-hidden shadow-xl h-full border-2 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-[1.02] flex flex-col"
              style={{ borderColor: 'rgba(3, 66, 37, 0.15)' }}
            >
              {/* Image Container - 50% height */}
              <div className="relative pt-[100%] overflow-hidden bg-white border-b border-gray-100">
                <div className="absolute inset-0 p-4 flex items-center justify-center">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain"
                        style={{ imageRendering: 'crisp-edges' }}
                    />
                </div>
                
                {/* Stock Badge */}
                {!product.inStock && (
                  <div className="absolute top-2 right-2 z-20">
                    <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 backdrop-blur-lg shadow-md border border-red-400/50">
                      <span className="text-[10px] font-bold text-white">Out of Stock</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content Section */}
              <div className="p-3 flex flex-col bg-white relative flex-1">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02]"
                     style={{ 
                       backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                     }}></div>
                
                <h3 className="text-xs md:text-sm font-serif font-bold mb-1 relative z-10 leading-tight" style={{ color: COLORS.darkGreen }}>
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-2 text-[10px] line-clamp-2 flex-grow relative z-10 leading-relaxed">
                  {product.desc}
                </p>
                
                {/* Price Display */}
                {product.inStock && product.variants && product.variants.length > 0 && (
                  <div className="mt-auto relative z-10">
                    <div className="flex items-baseline justify-between">
                      <p className="text-base md:text-lg font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                        ₹{product.variants[0].price}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">{product.variants[0].size}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .product-card-hover:hover {
            border-color: ${COLORS.goldenYellow} !important;
        }
      `}</style>
    </div>
  );
};

export default AllProductsGrid;

