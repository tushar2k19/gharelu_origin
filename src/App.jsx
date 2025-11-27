import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Leaf, Heart, Globe, ArrowRight, Instagram, Facebook, Twitter, Linkedin, Users, MapPin, XCircle, ShoppingBag, Package } from 'lucide-react';
import Cart from './Cart';

// --- Color Palette Constants ---
const COLORS = {
  darkGreen: '#034225',
  goldenYellow: '#f9b000',
  cream: '#f8f5e3',
  white: '#ffffff'
};

// --- Products Data ---
const PRODUCTS = [
  {
    id: 1,
    name: "Handrolled Premium Green Tea",
    category: "Organic Tea",
    image: "/assets/Handrolled_Premium_Green_Tea.png",
    desc: "Prepared by the skilled women of the producer group residing in the Panighata Tea Garden, our green tea is a testament to true craftsmanship.",
    variants: [
      { size: "50g", price: 150, inStock: true }
    ],
    inStock: true,
    teaGarden: "Panighata Tea Estate"
  },
  {
    id: 2,
    name: "Handrolled Orthodox Rose Tea",
    category: "Organic Tea",
    image: "/assets/Handrolled_Orthodox_Rose_Tea.png",
    desc: "Hand-blended by the skilled women of the producer group residing in the Panighata Tea Garden, our Orthodox Rose Tea is a royal indulgence and a sensory masterpiece.",
    variants: [
      { size: "50g", price: 150, inStock: true }
    ],
    inStock: true,
    teaGarden: "Panighata Tea Estate"
  },
  {
    id: 3,
    name: "Dalle Chilli Paste",
    category: "Condiments",
    image: "/assets/Dalle_Chilli_Paste.png",
    desc: "Stone-ground paste made with sun-dried Dalle chillies of Peshok- perfect for adding depth to your curries or marinades.",
    variants: [
      { size: "100g", price: 100, inStock: true },
      { size: "150g", price: 160, inStock: true },
      { size: "200g", price: 220, inStock: true }
    ],
    inStock: true,
    teaGarden: "Peshok Tea Estate"
  },
  {
    id: 4,
    name: "Seasonal Fruit Jam",
    category: "Pantry Staples",
    image: "/assets/Seasonal_Fruit_Jam.png",
    desc: "Produced with painstaking care by women of Mangarjung, focusing on a clean, bright taste and a perfect set. We honor the fruit by keeping the ingredients simple and pure.",
    variants: [
      { size: "200g", price: 150, inStock: true }
    ],
    inStock: true,
    teaGarden: "Mangarjung Tea Estate"
  },
  {
    id: 5,
    name: "Raw Honey",
    category: "Pantry Staples",
    image: "/assets/Raw_Honey.png",
    desc: "Collected from the pristine forests and tea gardens of Makaibari, our Natural Honey is a pure, golden delight. Each drop captures the untouched essence of the region, offering a wholesome taste of nature's finest.",
    variants: [
      { size: "120g", price: 200, inStock: true },
      { size: "250g", price: 370, inStock: true },
      { size: "400g", price: 570, inStock: true }
    ],
    inStock: true,
    teaGarden: "Makaibari Tea Estate"
  },
  {
    id: 6,
    name: "Orchid Essence Jar Candle",
    category: "Wellness",
    image: "/assets/Orchid_Essence_Jar_Candle.png",
    desc: "Subtle and floral, this candle fills your space with the soothing scent of Himalayan Orchids.",
    variants: [
      { size: "150g", price: 170, inStock: true }
    ],
    inStock: true,
    teaGarden: "Moondakotee Tea Estate"
  },
  {
    id: 7,
    name: "Herbal Body Soap (Neem & Mugwort)",
    category: "Wellness",
    image: "/assets/Herbal_Body_Soap_(Neem_&_Mugwort).png",
    desc: "Experience the purifying power of nature with our Neem & Mugwort Herbal Body Soap. Neem's antibacterial properties combine with mugwort's soothing essence to gently cleanse and protect your skin, leaving it refreshed and balanced after every wash.",
    variants: [
      { size: "50g", price: 100, inStock: true }
    ],
    inStock: true,
    teaGarden: "Ambootia Tea Estate"
  },
  {
    id: 8,
    name: "Herbal Body Soap (Orange Peel & Honey)",
    category: "Wellness",
    image: "/assets/Herbal_Body_Soap_(Orange_Peel_&_Honey).png",
    desc: "Awaken your senses with the zesty freshness of orange peel and the nourishing touch of honey. This soap gently exfoliates while honey locks in moisture, resulting in radiant, soft skin and a naturally uplifting bathing experience.",
    variants: [
      { size: "50g", price: 100, inStock: true }
    ],
    inStock: true,
    teaGarden: "Ambootia Tea Estate"
  },
  {
    id: 9,
    name: "Herbal Body Soap (Ricewater & Rose)",
    category: "Wellness",
    image: "/assets/Herbal_Body_Soap_(Ricewater_&_Rose).png",
    desc: "Indulge in the age-old beauty secrets of ricewater and rose. This luxurious soap hydrates and brightens, while the delicate scent of rose calms your senses, leaving your skin silky-smooth and beautifully fragrant.",
    variants: [
      { size: "50g", price: 100, inStock: true }
    ],
    inStock: true,
    teaGarden: "Ambootia Tea Estate"
  },
  {
    id: 10,
    name: "Herbal Body Soap (Beetroot & Honey)",
    category: "Wellness",
    image: "/assets/Herbal_Body_Soap_(Beetroot_&_Honey).png",
    desc: "Revitalize your skin with the antioxidant-rich blend of beetroot and honey. This unique soap deeply nourishes and helps restore your skin's natural glow, making it perfect for daily rejuvenation and gentle care.",
    variants: [
      { size: "50g", price: 100, inStock: true }
    ],
    inStock: true,
    teaGarden: "Ambootia Tea Estate"
  },
  {
    id: 11,
    name: "Premium Besan Bhujia",
    category: "Snacks",
    image: "/assets/Premium_Besan_Bhujia.png",
    desc: "Elevate your snack time with this richer version of bhujia, enhanced with crunchy cornflakes, roasted chana, and premium cashews.",
    variants: [
      { size: "200g", price: 79, inStock: true }
    ],
    inStock: true,
    teaGarden: "Samrikpani Tea Estate"
  },
  {
    id: 12,
    name: "Batare - Local Crunchy Snack",
    category: "Snacks",
    image: "/assets/Batare_Local_Crunchy_Snack.png",
    desc: "A regional crunchy snack made using traditional spices - a tangy, spicy burst of flavor in every bite",
    variants: [
      { size: "6 pcs", price: 69, inStock: true }
    ],
    inStock: true,
    teaGarden: "Samrikpani Tea Estate"
  },
  {
    id: 13,
    name: "Fini",
    category: "Snacks",
    image: "/assets/Fini.png",
    desc: "A regional crunchy snack made using traditional spices - a salty, spicy burst of flavor in every bite",
    variants: [
      { size: "6 pcs", price: 55, inStock: true }
    ],
    inStock: true,
    teaGarden: "Samrikpani Tea Estate"
  },
  {
    id: 14,
    name: "Sustainable Plates and Bowls",
    category: "Crafts",
    image: "/assets/Sustainable_Plates_and_Bowls.png",
    desc: "Meticulously shaped from natural, biodegradable materials, our current range features beautifully designed bowls and quarter plates. These pieces offer a unique, rustic charm, perfect for conscious consumers seeking an eco-friendly dining experience.",
    variants: [],
    inStock: false,
    teaGarden: "Panighata Tea Estate"
  }
];

const TEA_GARDENS = [
  {
    name: "Samrikpani Tea Estate",
    desc: "Nestled in the heart of Darjeeling, Samrikpani Tea Estate is home to the beloved Ama Ko Bhujia. Crafted by local SHG Didis, these crispy delights are more than snacks—they're a celebration of heritage and homely warmth. Whether it’s a quiet chai moment or a lively gathering, Samrik brings the hills to your plate.",
    image: "https://images.unsplash.com/photo-1565551381226-724f2b904d9c?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Peshok Tea Estate",
    desc: "From the fiery foothills of Peshok comes a bold burst of flavor. Known for its GI-tagged Dalle Chillies, Peshok's condiments are handcrafted to add depth and spice to every dish. A tribute to the valley's vibrant culinary spirit.",
    image: "https://images.unsplash.com/photo-1589139268789-700438c8c5c7?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Moondakotee Tea Estate",
    desc: "High above the clouds, Moondakotee crafts serenity in a jar. Their orchid-scented candles, hand-poured by local women, capture the essence of Himalayan blooms. A gentle glow, a calming breath—Moondakotee brings nature indoors.",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Mangarjung Tea Estate",
    desc: "Enjoy our handcrafted jams, made by local women using select fruits from the hills. Each jar offers pure, natural sweetness—perfect for any season.",
    image: "https://images.unsplash.com/photo-1621255755225-ee954496417d?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Panighata Tea Estate",
    desc: "Panighata is where sustainability meets tradition. From biodegradable cutlery to hand-rolled green tea, every creation reflects a commitment to eco-conscious living and women-led craftsmanship.",
    image: "https://images.unsplash.com/photo-1546252479-566b7a2d61d1?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Makaibari Tea Estate",
    desc: "In the untouched forests of Makaibari, bees craft nature's nectar. Their pure honey, collected with care, offers a floral richness that's both wholesome and healing. A taste of the wild, preserved in every drop.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Ambootia Tea Estate",
    desc: "Ambootia blends tradition with wellness. From herbal soaps to black laundry bars, each product is handmade using age-old recipes and natural ingredients. It's a return to purity, powered by the hills.",
    image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=800&auto=format&fit=crop"
  }
];

const IMPACT_STATS = [
  { icon: Users, label: "Households Touched", value: "5,000+" },
  { icon: Heart, label: "Women Empowered", value: "100%" },
  { icon: Leaf, label: "Locally Sourced", value: "Native" },
];

const SOCIAL_LINKS = [
  { icon: Instagram, url: "https://www.instagram.com/gharelu.origins" },
  { icon: Facebook, url: "https://www.facebook.com/GhareluOrigins" },
  { icon: Twitter, url: "https://x.com/gharelu_origins" },
  { icon: Linkedin, url: "https://www.linkedin.com/company/gharelu-origins" }
];

// --- Components ---

const Logo = () => (
  <div className="flex flex-col items-center justify-center font-serif tracking-widest text-center cursor-pointer select-none">
    <img src="Logo.jpg" alt="Gharelu Origins" className="h-16 md:h-20" />
  </div>
);

const SectionHeading = ({ children, align = "center" }) => (
  <h2 
    className={`text-3xl md:text-5xl font-serif font-bold mb-12 ${align === "left" ? "text-left" : "text-center"}`}
    style={{ color: COLORS.darkGreen }}
  >
    {children}
  </h2>
);

// --- Product Detail Modal Component ---
const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

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

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transform transition-all duration-500"
        style={{ 
          backgroundColor: COLORS.cream,
          transform: isOpen ? 'scale(1) rotateY(0deg)' : 'scale(0.9) rotateY(10deg)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all hover:scale-110"
          style={{ color: COLORS.darkGreen }}
        >
          <XCircle size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Image with 3D Effect */}
          <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="absolute inset-0 [perspective:1000px] group">
              <div className="relative w-full h-full transform transition-transform duration-700 group-hover:[transform:rotateY(5deg)_rotateX(2deg)]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain p-8 drop-shadow-2xl"
                />
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 px-4 py-2 rounded-full backdrop-blur-md bg-white/80 shadow-lg">
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: COLORS.darkGreen }}>
                {product.category}
              </span>
            </div>
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 px-6 py-3 rounded-2xl backdrop-blur-md bg-white/90 shadow-xl">
              <div className="flex items-center space-x-2">
                <MapPin size={18} style={{ color: COLORS.goldenYellow }} />
                <span className="text-sm font-bold" style={{ color: COLORS.darkGreen }}>
                  {product.teaGarden}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="p-8 md:p-12 flex flex-col justify-between" style={{ backgroundColor: COLORS.white }}>
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" style={{ color: COLORS.darkGreen }}>
                {product.name}
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {product.desc}
              </p>

              {/* Stock Status */}
              {!product.inStock ? (
                <div className="mb-8 p-4 rounded-xl bg-red-50 border-2 border-red-200">
                  <div className="flex items-center space-x-2">
                    <XCircle size={20} className="text-red-600" />
                    <span className="font-bold text-red-600">Out of Stock</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Variants Selection */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-bold tracking-wider uppercase mb-4" style={{ color: COLORS.darkGreen }}>
                        Select Variant
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {product.variants.map((variant, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedVariant(variant)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                              selectedVariant === variant 
                                ? 'shadow-lg' 
                                : 'hover:shadow-md'
                            }`}
                            style={{
                              borderColor: selectedVariant === variant ? COLORS.goldenYellow : '#e5e7eb',
                              backgroundColor: selectedVariant === variant ? COLORS.cream : 'white'
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Package size={18} style={{ color: COLORS.darkGreen }} />
                              <span className="text-xs font-bold uppercase" style={{ color: COLORS.darkGreen }}>
                                {variant.size}
                              </span>
                            </div>
                            {variant.inStock ? (
                              <div className="text-2xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                                ₹{variant.price}
                              </div>
                            ) : (
                              <div className="text-sm font-bold text-red-600">Out of Stock</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Display */}
                  {selectedVariant && selectedVariant.inStock && (
                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br" style={{ 
                      background: `linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.white} 100%)`,
                      border: `2px solid ${COLORS.goldenYellow}`
                    }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold tracking-wider uppercase mb-1" style={{ color: COLORS.darkGreen }}>
                            Price
                          </p>
                          <p className="text-4xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                            ₹{selectedVariant.price}
                          </p>
                        </div>
                        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: COLORS.goldenYellow }}>
                          <Leaf size={32} style={{ color: COLORS.darkGreen }} />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {product.inStock && selectedVariant && selectedVariant.inStock ? (
                <>
                  <button
                    onClick={() => {
                      if (onAddToCart && selectedVariant) {
                        onAddToCart(product, selectedVariant);
                        setShowSuccess(true);
                        setTimeout(() => setShowSuccess(false), 3000);
                      }
                    }}
                    className="w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    style={{ backgroundColor: COLORS.darkGreen, color: COLORS.white }}
                  >
                    <ShoppingBag size={24} />
                    <span>Add to Cart</span>
                  </button>
                  {showSuccess && (
                    <div className="p-3 rounded-lg bg-green-50 border-2 border-green-200 text-center">
                      <span className="text-sm font-bold text-green-700">✓ Added to cart!</span>
                    </div>
                  )}
                </>
              ) : null}
              <button
                onClick={onClose}
                className="w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 border-2 hover:bg-gray-50"
                style={{ borderColor: COLORS.darkGreen, color: COLORS.darkGreen }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = ({ onProductClick }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(450);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Duplicate products for seamless infinite scroll (3 sets for smooth looping)
  const duplicatedProducts = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardWidth(450); // Show ~2.75-3 cards at once on desktop
      } else if (window.innerWidth >= 640) {
        setCardWidth(380); // Show ~2 cards on tablet
      } else {
        setCardWidth(340); // Show ~1 card on mobile
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.7; // pixels per frame (increased for faster auto-scroll)
    
    const animate = () => {
      if (!isPaused && container) {
        scrollPositionRef.current += scrollSpeed;
        
        // Reset position when we've scrolled one full set of products
        const singleSetWidth = container.scrollWidth / 3;
        if (scrollPositionRef.current >= singleSetWidth) {
          scrollPositionRef.current = 0;
        }
        
        container.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Smooth scroll animation function
  const smoothScrollTo = (targetPosition, duration = 500) => {
    setIsPaused(true);
    const container = scrollContainerRef.current;
    if (!container) return;

    const startPosition = scrollPositionRef.current;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    let animationFrameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      scrollPositionRef.current = startPosition + distance * ease;
      container.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Resume auto-scroll after smooth scroll completes + 2 seconds
        setTimeout(() => setIsPaused(false), 2000);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  };

  // Manual scroll functions with smooth animation
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = cardWidth + 40; // card width + padding
    const targetPosition = Math.max(0, scrollPositionRef.current - scrollAmount);
    smoothScrollTo(targetPosition);
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = cardWidth + 40; // card width + padding
    const singleSetWidth = container.scrollWidth / 3;
    const targetPosition = Math.min(singleSetWidth - 1, scrollPositionRef.current + scrollAmount);
    smoothScrollTo(targetPosition);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto"
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}>
      {/* Gradient Fade Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
           style={{ background: `linear-gradient(to right, ${COLORS.cream}, transparent)` }}></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
           style={{ background: `linear-gradient(to left, ${COLORS.cream}, transparent)` }}></div>

      <div className="overflow-hidden py-8">
        <div 
          ref={scrollContainerRef}
          className="flex"
          style={{ willChange: 'transform' }}
        >
          {duplicatedProducts.map((product, idx) => (
            <div 
              key={`${product.id}-${idx}`} 
              className="flex-shrink-0 px-5"
              style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px` }}
            >
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full border border-gray-200 hover:border-opacity-50" 
                   style={{ borderColor: COLORS.darkGreen }}>
                {/* 3D Card Effect with Enhanced Design */}
                <div className="relative [perspective:1000px] h-full">
                  <div className="relative transform transition-all duration-500 group-hover:[transform:rotateY(3deg)_rotateX(-2deg)_translateY(-8px)] [transform-style:preserve-3d]">
                    {/* Image Container with Modern Gradient */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent z-10"></div>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-5 transform group-hover:scale-110 transition-transform duration-700 relative z-0"
                      />
                      
                      {/* Modern Category Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <div className="px-3 py-1.5 rounded-full backdrop-blur-lg bg-white/95 shadow-xl border border-white/50">
                          <span className="text-xs font-bold tracking-wider uppercase" style={{ color: COLORS.darkGreen }}>
                            {product.category}
                          </span>
                        </div>
                      </div>

                      {/* Stock Badge with Modern Design */}
                      {!product.inStock && (
                        <div className="absolute top-3 right-3 z-20">
                          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 backdrop-blur-lg shadow-xl border border-red-400/50">
                            <span className="text-xs font-bold text-white">Out of Stock</span>
                          </div>
                        </div>
                      )}

                      {/* Decorative Corner Element */}
                      <div className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                        <div className="absolute top-0 right-0 w-full h-full" 
                             style={{ 
                               background: `radial-gradient(circle at top right, ${COLORS.goldenYellow}, transparent)`,
                               transform: 'rotate(45deg)'
                             }}></div>
                      </div>
                    </div>
                    
                    {/* Content Section with Enhanced Design */}
                    <div className="p-5 flex flex-col bg-white relative">
                      {/* Subtle Background Pattern */}
                      <div className="absolute inset-0 opacity-[0.02]"
                           style={{ 
                             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                           }}></div>
                      
                      <h3 className="text-lg font-serif font-bold mb-2 relative z-10" style={{ color: COLORS.darkGreen }}>
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm line-clamp-2 flex-grow relative z-10 leading-relaxed">
                        {product.desc}
                      </p>
                      
                      {/* Enhanced Price Display */}
                      {product.inStock && product.variants && product.variants.length > 0 && (
                        <div className="mb-3 relative z-10">
                          <div className="flex items-baseline space-x-2">
                            <p className="text-2xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                              ₹{product.variants[0].price}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 font-medium">{product.variants[0].size}</p>
                        </div>
                      )}

                      {/* Modern Button Design */}
                      <button 
                        onClick={() => onProductClick(product)}
                        className="mt-auto w-full py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 group/btn relative z-10 shadow-lg hover:shadow-xl"
                        style={{ 
                          background: `linear-gradient(135deg, ${COLORS.darkGreen} 0%, #025a2f 100%)`,
                          color: COLORS.white 
                        }}
                      >
                        <span>View Details</span>
                        <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12" 
                             style={{ animation: 'shimmer 2s infinite' }}></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10 blur-3xl"
                     style={{ 
                       background: `radial-gradient(circle at center, ${COLORS.goldenYellow}, ${COLORS.darkGreen})`,
                       transform: 'scale(1.1)'
                     }}></div>

                {/* Subtle Border Glow on Hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ 
                       boxShadow: `0 0 0 2px ${COLORS.goldenYellow}40, 0 0 20px ${COLORS.goldenYellow}20`
                     }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-3 rounded-full shadow-xl hover:bg-white transition-all transform hover:scale-110 z-30 border border-gray-200"
        style={{ color: COLORS.darkGreen }}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={scrollRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-3 rounded-full shadow-xl hover:bg-white transition-all transform hover:scale-110 z-30 border border-gray-200"
        style={{ color: COLORS.darkGreen }}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>

      {/* Add CSS Animation for shimmer */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'cart'
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('gharelu_cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gharelu_cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate cart total
  const getCartTotal = (items) => {
    return items.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
  };

  // Add item to cart
  const addToCart = (product, variant) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.productId === product.id && item.variant.size === variant.size
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        // Add new item
        const newItem = {
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          productDesc: product.desc,
          productCategory: product.category,
          teaGarden: product.teaGarden,
          variant: variant,
          quantity: 1
        };
        updatedItems = [...prevCart.items, newItem];
      }
      return { items: updatedItems, total: getCartTotal(updatedItems) };
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, variantSize) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(
        item => !(item.productId === productId && item.variant.size === variantSize)
      );
      return { items: updatedItems, total: getCartTotal(updatedItems) };
    });
  };

  // Update item quantity
  const updateQuantity = (productId, variantSize, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, variantSize);
      return;
    }
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.productId === productId && item.variant.size === variantSize
          ? { ...item, quantity: newQuantity }
          : item
      );
      return { items: updatedItems, total: getCartTotal(updatedItems) };
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Render Cart page if currentPage is 'cart'
  if (currentPage === 'cart') {
    return (
      <>
        {/* Navigation for Cart Page */}
        <nav 
          className={`fixed w-full z-50 transition-all duration-300 py-4 shadow-md`}
          style={{ backgroundColor: COLORS.cream }}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} className="cursor-pointer">
              <Logo />
            </div>
            <button
              onClick={() => setCurrentPage('home')}
              className="relative hover:opacity-70 transition-opacity"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: COLORS.goldenYellow }}>
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>
        </nav>
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          onBackToHome={() => setCurrentPage('home')}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}>
      
      {/* --- Navigation --- */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 shadow-md' : 'py-6'}`}
        style={{ backgroundColor: scrolled ? COLORS.cream : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div onClick={() => window.scrollTo(0,0)}>
             <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12 font-medium tracking-wide">
            {['Collection', 'Our Tea Gardens', 'Our Story', 'Impact'].map((item) => (
              <button 
                key={item} 
                onClick={() => {
                  setCurrentPage('home');
                  scrollToSection(item.toLowerCase().replace(/\s+/g, '-'));
                }}
                className="hover:opacity-70 transition-opacity relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: COLORS.goldenYellow }}></span>
              </button>
            ))}
            {/* Cart Icon */}
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative hover:opacity-70 transition-opacity"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: COLORS.goldenYellow }}>
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle and Cart */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: COLORS.goldenYellow }}>
                  {getCartItemCount()}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col space-y-6">
            {['Collection', 'Our Tea Gardens', 'Our Story', 'Impact'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                  scrollToSection(item.toLowerCase().replace(/\s+/g, '-'));
                }}
                className="text-xl font-serif text-left"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 order-2 md:order-1">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-6" style={{ backgroundColor: COLORS.goldenYellow, color: COLORS.darkGreen }}>
              Ethically Sourced
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-8">
              Purity from the <br /> 
              <span className="italic" style={{ color: COLORS.goldenYellow }}>Himalayas</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-lg leading-relaxed opacity-90">
              Discover authentic products rooted in the traditions of Darjeeling. 
              Grown with care, harvested with purpose, and brought directly to your home.
            </p>
            <button 
              onClick={() => scrollToSection('collection')}
              className="inline-flex items-center px-8 py-4 rounded-full text-white font-bold tracking-wide transition-transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: COLORS.darkGreen }}
            >
              Explore Collection <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
          
          <div className="relative order-1 md:order-2">
            {/* Abstract decorative shapes */}
            <div className="absolute top-0 right-0 w-full h-full rounded-full opacity-20 filter blur-3xl transform translate-x-1/4 -translate-y-1/4" style={{ backgroundColor: COLORS.goldenYellow }}></div>
            <img 
              src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1000&auto=format&fit=crop" 
              alt="Tea Garden in Darjeeling" 
              className="relative w-full h-[500px] object-cover rounded-[2rem] shadow-2xl z-10"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
              <p className="font-serif italic text-lg mb-2">"The soul of the mountains in every sip."</p>
              <div className="flex text-yellow-500">★★★★★</div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Products Section --- */}
      <section id="collection" className="py-20 md:py-32">
        <SectionHeading>Collection</SectionHeading>
        <ProductCarousel onProductClick={handleProductClick} />
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onAddToCart={addToCart}
      />

      {/* --- Our Tea Gardens Section --- */}
      <section id="our-tea-gardens" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading>Our Tea Gardens</SectionHeading>
          <p className="text-center max-w-3xl mx-auto mb-16 text-lg text-gray-700">
             Discover the soul of Darjeeling through the unique offerings of seven remarkable tea estates. 
             Each garden tells a story—of tradition, craftsmanship, and the women who bring these creations to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEA_GARDENS.map((garden, idx) => (
              <div key={idx} className="group rounded-xl [perspective:1000px] relative" style={{height: '380px'}}>
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front Face */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden shadow-lg bg-gray-50 flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={garden.image} 
                        alt={garden.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center mb-3">
                        <MapPin className="mr-2 flex-shrink-0" size={18} style={{ color: COLORS.goldenYellow }} />
                        <h3 className="text-xl font-serif font-bold" style={{ color: COLORS.darkGreen }}>{garden.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">{garden.desc}</p>
                    </div>
                  </div>
 
                  {/* Back Face */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden shadow-lg flex flex-col p-8 relative">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={garden.image} 
                        alt={garden.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-white opacity-70"></div>
                    </div>
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <MapPin className="mr-2 flex-shrink-0" size={18} style={{ color: COLORS.goldenYellow }} />
                        <h3 className="text-xl font-serif font-bold" style={{ color: COLORS.darkGreen }}>{garden.name}</h3>
                      </div>
                      <div className="overflow-y-auto flex-grow">
                        <p className="text-gray-800 text-sm leading-relaxed font-bold">{garden.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Fixed Yellow Line - Visible on both sides */}
                <div className="absolute bottom-0 left-0 right-0 h-2 rounded-b-xl overflow-hidden z-10">
                  <div 
                    className="h-full w-0 group-hover:w-full transition-all duration-500 ease-out origin-left" 
                    style={{ backgroundColor: COLORS.goldenYellow }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Our Story Section --- */}
      <section id="our-story" className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
         {/* Decorative leaf background */}
        <Leaf className="absolute top-10 right-10 w-64 h-64 text-green-800 opacity-5 rotate-45" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 transform translate-x-4 translate-y-4 rounded-2xl" style={{ border: `2px solid ${COLORS.goldenYellow}` }}></div>
              <img 
                src="https://images.unsplash.com/photo-1544253303-376046e8c750?q=80&w=1000&auto=format&fit=crop" 
                alt="Woman harvesting tea" 
                className="relative rounded-2xl shadow-lg w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: COLORS.goldenYellow }}>Our Origins</h3>
              <SectionHeading align="left">Rooted in Darjeeling</SectionHeading>
              
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  In the last decade, tea estates in and around Darjeeling were shut down due to absentee ownership, mismanagement, and unrest—leaving generations of tea workers, especially women, without income or support. The closures triggered distress migration and eroded local livelihoods. Climate change and ageing bushes deepened the crisis.
                </p>
                <p>
                  With limited options and no alternative skills, communities faced deep uncertainty. Supported by the Gates Foundation and in partnership with the Darjeeling Welfare Society, the Gorkhaland Territorial Administration, the West Bengal State Rural Livelihoods Mission, and Grant Thornton Bharat, a mission was launched to restore livelihoods.
                </p>
                <p>
                  <strong style={{ color: COLORS.darkGreen }}>Gharelu Origins</strong> is the result of these efforts—a brand born of heritage, heart, and the unwavering spirit of Darjeeling’s people. From their homes, women now craft the finest products, reviving income, dignity, and hope.
                </p>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-300 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-4xl font-serif font-bold mb-2" style={{ color: COLORS.goldenYellow }}>5,000+</h4>
                  <p className="text-sm uppercase tracking-wider">Households Touched</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif font-bold mb-2" style={{ color: COLORS.goldenYellow }}>100%</h4>
                  <p className="text-sm uppercase tracking-wider">Community Led</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Our Impact Section --- */}
      <section id="impact" className="py-20 md:py-32 relative bg-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading>Our Impact</SectionHeading>
          <p className="text-center max-w-3xl mx-auto mb-16 text-lg">
             Over 5,000 households touched through training and support to create unique, value-added products using local resources. We are reviving income, dignity, and hope for the communities of Darjeeling.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {IMPACT_STATS.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow text-center group border border-transparent hover:border-green-100"
              >
                <div 
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: COLORS.cream }}
                >
                  <stat.icon size={36} style={{ color: COLORS.darkGreen }} />
                </div>
                <h3 className="text-5xl font-serif font-bold mb-4" style={{ color: COLORS.goldenYellow }}>
                  {stat.value}
                </h3>
                <h4 className="text-xl font-bold mb-2" style={{ color: COLORS.darkGreen }}>{stat.label}</h4>
                <p className="text-sm text-gray-500">Restoring livelihoods and creating sustainable futures.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="text-white py-16 px-6" style={{ backgroundColor: COLORS.darkGreen }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 border-b border-green-800 pb-12">
          {/* Column 1: Info & Social */}
          <div className="md:col-span-1">
             <div className="flex items-center space-x-2 mb-6">
                <Leaf className="text-white" size={24} />
                <span className="font-serif font-bold text-xl tracking-wider">GHARELU ORIGINS</span>
             </div>
             <p className="text-green-200 text-sm leading-relaxed mb-6">
               Rooted in Darjeeling, Grown with Purpose. Bringing the Himalayas to your doorstep.
             </p>
             <div className="flex space-x-4">
               {SOCIAL_LINKS.map((social, i) => (
                 <a 
                    key={i} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-white hover:text-green-900 transition-colors"
                 >
                   <social.icon size={18} />
                 </a>
               ))}
             </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-bold mb-6 text-green-300 uppercase tracking-widest text-sm">Company</h4>
            <ul className="space-y-4 text-green-100 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="font-bold mb-6 text-green-300 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-green-200 text-sm mb-4">Join our community for harvest updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-3 rounded-l-lg bg-green-800 border-none text-white placeholder-green-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <button 
                className="px-6 py-3 rounded-r-lg font-bold transition-colors hover:bg-yellow-400"
                style={{ backgroundColor: COLORS.goldenYellow, color: COLORS.darkGreen }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 text-center text-green-400 text-xs">
          &copy; {new Date().getFullYear()} Gharelu Origins. All rights reserved.
        </div>
      </footer>
    </div>
  );
}