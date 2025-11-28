import React, { useState, useEffect } from 'react';
import { XCircle, Package, Leaf, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { COLORS } from './constants';
import Toast from './Toast';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart, cart, updateQuantity, removeFromCart }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Get current quantity for selected variant
  const getCurrentQuantity = () => {
    if (!product || !selectedVariant || !cart) return 0;
    const cartItem = cart.items.find(
      item => item.productId === product.id && item.variant.size === selectedVariant.size
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const currentQuantity = getCurrentQuantity();

  const handleAddToCart = () => {
    if (onAddToCart && selectedVariant) {
      onAddToCart(product, selectedVariant);
      setShowToast(true);
    }
  };

  const handleIncrement = () => {
    if (updateQuantity && product && selectedVariant) {
      updateQuantity(product.id, selectedVariant.size, currentQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (updateQuantity && product && selectedVariant) {
      updateQuantity(product.id, selectedVariant.size, currentQuantity - 1);
    }
  };

  const handleRemove = () => {
    if (removeFromCart && product && selectedVariant) {
      removeFromCart(product.id, selectedVariant.size);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <>
      <Toast 
        message="Product added to bag!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4"
        onClick={onClose}
      >
        {/* Backdrop with blur */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: isOpen ? 1 : 0 }}
        />
        
        {/* Modal Content */}
        <div 
          className="relative w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500"
          style={{ 
            backgroundColor: COLORS.cream,
            transform: isOpen ? 'scale(1) rotateY(0deg)' : 'scale(0.9) rotateY(10deg)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
            style={{ color: COLORS.darkGreen }}
          >
            <XCircle size={16} />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Image */}
            <div className="relative h-[200px] md:h-[300px] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div 
                className="absolute inset-0 cursor-zoom-in flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  // Zoom functionality - create zoom overlay
                  const zoomOverlay = document.createElement('div');
                  zoomOverlay.className = 'fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4';
                  zoomOverlay.onclick = () => zoomOverlay.remove();
                  
                  const closeBtn = document.createElement('button');
                  closeBtn.className = 'absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all';
                  closeBtn.style.color = COLORS.darkGreen;
                  closeBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
                  closeBtn.onclick = () => zoomOverlay.remove();
                  closeBtn.setAttribute('aria-label', 'Close zoom');
                  
                  const zoomImg = document.createElement('img');
                  zoomImg.src = product.image;
                  zoomImg.alt = product.name;
                  zoomImg.className = 'max-w-[90vw] max-h-[90vh] object-contain';
                  zoomImg.style.imageRendering = 'crisp-edges';
                  zoomImg.onclick = (e) => e.stopPropagation();
                  
                  zoomOverlay.appendChild(closeBtn);
                  zoomOverlay.appendChild(zoomImg);
                  document.body.appendChild(zoomOverlay);
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="max-w-full max-h-full object-contain p-4"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="p-4 md:p-6 flex flex-col justify-between" style={{ backgroundColor: COLORS.white }}>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2" style={{ color: COLORS.darkGreen }}>
                  {product.name}
                </h2>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {product.desc}
                </p>

                {/* Stock Status */}
                {!product.inStock ? (
                  <div className="mb-4 p-2 rounded-lg bg-red-50 border-2 border-red-200">
                    <div className="flex items-center space-x-2">
                      <XCircle size={12} className="text-red-600" />
                      <span className="font-bold text-red-600 text-xs">Out of Stock</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Variants Selection */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: COLORS.darkGreen }}>
                          Select Variant
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {product.variants.map((variant, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedVariant(variant)}
                              className={`p-2 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                                selectedVariant === variant 
                                  ? 'shadow-lg' 
                                  : 'hover:shadow-md'
                              }`}
                              style={{
                                borderColor: selectedVariant === variant ? COLORS.goldenYellow : '#e5e7eb',
                                backgroundColor: selectedVariant === variant ? COLORS.cream : 'white'
                              }}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <Package size={12} style={{ color: COLORS.darkGreen }} />
                                <span className="text-[10px] font-bold uppercase" style={{ color: COLORS.darkGreen }}>
                                  {variant.size}
                                </span>
                              </div>
                              {variant.inStock ? (
                                <div className="text-xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                                  ₹{variant.price}
                                </div>
                              ) : (
                                <div className="text-xs font-bold text-red-600">Out of Stock</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 mt-auto">
                {product.inStock && selectedVariant && selectedVariant.inStock ? (
                  <div className="flex items-center gap-2">
                    {currentQuantity === 0 ? (
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                        style={{ backgroundColor: COLORS.darkGreen, color: COLORS.white }}
                      >
                        <ShoppingBag size={16} />
                        <span>Add to Bag</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleAddToCart}
                          className="flex-1 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                          style={{ backgroundColor: COLORS.darkGreen, color: COLORS.white }}
                        >
                          <ShoppingBag size={16} />
                          <span>Add to Cart</span>
                        </button>
                        <div className="flex items-center rounded-full border-2 px-2 py-1" style={{ borderColor: COLORS.goldenYellow, backgroundColor: COLORS.white }}>
                          {currentQuantity === 1 ? (
                            <button
                              onClick={handleRemove}
                              className="flex items-center justify-center p-1 hover:opacity-70 transition-opacity"
                              style={{ color: COLORS.darkGreen }}
                            >
                              <Trash2 size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={handleDecrement}
                              className="flex items-center justify-center p-1 hover:opacity-70 transition-opacity"
                              style={{ color: COLORS.darkGreen }}
                            >
                              <Minus size={14} />
                            </button>
                          )}
                          <span className="mx-2 text-sm font-bold" style={{ color: COLORS.darkGreen }}>
                            {currentQuantity}
                          </span>
                          <button
                            onClick={handleIncrement}
                            className="flex items-center justify-center p-1 hover:opacity-70 transition-opacity"
                            style={{ color: COLORS.darkGreen }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : null}
                <button
                  onClick={onClose}
                  className="w-full py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 border-2 hover:bg-gray-50"
                  style={{ borderColor: COLORS.darkGreen, color: COLORS.darkGreen }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailModal;

