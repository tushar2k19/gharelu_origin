import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Leaf, Heart, Globe, ArrowRight, Instagram, Facebook, Twitter, Linkedin, Users, MapPin, XCircle, ShoppingBag, Package, Coffee, Flame, Lightbulb, Apple, Recycle, Droplet, Sparkles, Mountain, Waves, Trash2, Minus, Plus } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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

// Icon mapping for each tea garden
const TEA_GARDEN_ICONS = {
  "Samrikpani Tea Estate": Package,
  "Peshok Tea Estate": Flame,
  "Moondakotee Tea Estate": Lightbulb,
  "Mangarjung Tea Estate": Apple,
  "Panighata Tea Estate": Recycle,
  "Makaibari Tea Estate": Droplet,
  "Ambootia Tea Estate": Sparkles
};

// Gradient colors for each tea garden - richer, more saturated for better contrast
const TEA_GARDEN_GRADIENTS = {
  "Samrikpani Tea Estate": { 
    front: "from-amber-300 via-orange-200 to-yellow-200",
    back: "from-amber-800 via-orange-700 to-yellow-700"
  },
  "Peshok Tea Estate": { 
    front: "from-red-300 via-orange-300 to-amber-300",
    back: "from-red-800 via-orange-800 to-amber-800"
  },
  "Moondakotee Tea Estate": { 
    front: "from-purple-300 via-indigo-300 to-blue-300",
    back: "from-purple-800 via-indigo-800 to-blue-800"
  },
  "Mangarjung Tea Estate": { 
    front: "from-pink-300 via-rose-300 to-red-300",
    back: "from-pink-800 via-rose-800 to-red-800"
  },
  "Panighata Tea Estate": { 
    front: "from-green-300 via-emerald-300 to-teal-300",
    back: "from-green-800 via-emerald-800 to-teal-800"
  },
  "Makaibari Tea Estate": { 
    front: "from-yellow-300 via-amber-300 to-orange-300",
    back: "from-yellow-800 via-amber-800 to-orange-800"
  },
  "Ambootia Tea Estate": { 
    front: "from-blue-300 via-cyan-300 to-teal-300",
    back: "from-blue-800 via-cyan-800 to-teal-800"
  }
};

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
  <div className="flex items-center gap-2 md:gap-3 cursor-pointer select-none">
    <img 
      src="/assets/Gharelu Origins.svg" 
      alt="Gharelu Origins" 
      className="h-11 md:h-14 w-auto object-contain m-0 p-0"
      style={{ margin: 0, padding: 0, paddingBottom: 0 }}
    />
    <img 
      src="/assets/DWS Logo.svg" 
      alt="Darjeeling Welfare Society" 
      className="h-8 md:h-10 w-auto object-contain m-0 p-0"
      style={{ margin: 0, padding: 0, paddingBottom: 0 }}
    />
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

// Floating Tea Leaves Component
const FloatingTeaLeaves = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const leaves = Array.from({ length: prefersReducedMotion ? 3 : 6 }, (_, i) => i);
  const steamWisps = Array.from({ length: prefersReducedMotion ? 2 : 4 }, (_, i) => i);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Floating Tea Leaves */}
      {leaves.map((leaf, idx) => (
        <motion.div
          key={`leaf-${idx}`}
          className="absolute hidden md:block"
          initial={{
            left: `${10 + Math.random() * 80}%`,
            top: `${60 + Math.random() * 30}%`,
            opacity: 0.2,
          }}
          animate={prefersReducedMotion ? {} : {
            y: [0, -30, -60, -30, 0],
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 20 - 10, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.4, 0.5, 0.2],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          <Leaf 
            size={16 + Math.random() * 12} 
            style={{ color: COLORS.darkGreen }}
            className="drop-shadow-lg"
          />
        </motion.div>
      ))}
      
      {/* Tea Steam/Wisp Animations */}
      {steamWisps.map((wisp, idx) => (
        <motion.div
          key={`steam-${idx}`}
          className="absolute hidden md:block"
          initial={{
            left: `${20 + idx * 20}%`,
            bottom: '10%',
            opacity: 0,
          }}
          animate={prefersReducedMotion ? {} : {
            y: [0, -50, -100, -150],
            x: [0, Math.random() * 10 - 5, Math.random() * 10 - 5, 0],
            scale: [0.8, 1, 1.2, 1.5],
            opacity: [0, 0.4, 0.3, 0],
          }}
          transition={prefersReducedMotion ? {} : {
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: idx * 1.5 + Math.random(),
            ease: "easeOut",
          }}
        >
          <div 
            className="w-1 h-16 rounded-full blur-sm"
            style={{ 
              background: `linear-gradient(to top, ${COLORS.cream}80, transparent)`,
              boxShadow: `0 0 10px ${COLORS.cream}40`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Trust Markers Component
const TrustMarkers = () => {
  const markers = [
    "Supported by Gates Foundation",
    "In Partnership with Darjeeling Welfare Society",
    "Gorkhaland Territorial Administration",
    "West Bengal State Rural Livelihoods Mission"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="absolute bottom-4 md:bottom-8 left-4 right-4 md:left-12 md:right-12 z-20 flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start"
    >
      {markers.map((marker, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.4 + idx * 0.1 }}
          className="px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md bg-white/90 shadow-lg border border-white/50"
        >
          <span className="text-[10px] xs:text-xs md:text-sm font-semibold tracking-wide leading-tight" style={{ color: COLORS.darkGreen }}>
            {marker}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Impact Stats Bar Component
const ImpactStatsBar = () => {
  const stats = [
    { value: "5,000+", label: "Households", icon: Users },
    { value: "7", label: "Tea Estates", icon: MapPin },
    { value: "100%", label: "Women-Led", icon: Heart },
    { value: "Native", label: "Locally Sourced", icon: Leaf }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="relative w-full py-8 md:py-12 px-6 z-10"
      style={{ backgroundColor: COLORS.cream }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: COLORS.white }}
                  >
                    <IconComponent size={28} style={{ color: COLORS.darkGreen }} />
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                >
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-1" style={{ color: COLORS.goldenYellow }}>
                    {stat.value}
                  </h3>
                  <p className="text-sm md:text-base font-semibold tracking-wide" style={{ color: COLORS.darkGreen }}>
                    {stat.label}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Hero Section Component with Parallax
const HeroSection = ({ scrollToSection }) => {
  const heroRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  return (
    <header 
      ref={heroRef}
      className="relative w-full min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh] overflow-hidden z-10 flex items-center pt-16 md:pt-20"
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img 
          src="/assets/hero-section-image.jpg" 
          alt="Women from Darjeeling community showcasing locally produced products" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient Overlays for Text Readability */}
      <motion.div 
        className="absolute inset-0 z-1"
        style={{
          background: `linear-gradient(135deg, ${COLORS.darkGreen}E6 0%, ${COLORS.darkGreen}CC 30%, ${COLORS.darkGreen}99 60%, transparent 100%)`,
          opacity
        }}
      />
      <div 
        className="absolute inset-0 z-1"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${COLORS.darkGreen}40 70%, ${COLORS.darkGreen}80 100%)`
        }}
      />

      {/* Nepali-Tibetan Texture Overlay */}
      <div className="absolute inset-0 z-2 nepali-texture paper-texture opacity-30" />

      {/* Floating Tea Leaves */}
      <FloatingTeaLeaves />

      {/* Content Container with Parallax */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-16 md:py-20"
        style={{ y: contentY }}
      >
        <div className="max-w-3xl">
          {/* Heading with Staggered Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif font-bold leading-[1.1] mb-3 md:mb-4 text-white drop-shadow-2xl"
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            }}
          >
            Darjeeling's Heritage.
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              style={{ 
                color: COLORS.goldenYellow,
                fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)',
              }}
            >
              Handcrafted by Her.
            </motion.span>
          </motion.h1>

          {/* Body Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mb-5 md:mb-7 max-w-2xl text-white/95 drop-shadow-lg font-medium"
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.375rem)',
              lineHeight: '1.6',
            }}
          >
            From the fiery heat of Dalle Chilli to the calm of Handrolled Green Tea, experience products made with resilience. We are a movement of 5,000 households across 7 tea estates, crafting world-class goods to restore dignity, income, and hope.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('collection')}
              className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 rounded-lg text-white font-semibold text-sm md:text-base tracking-wide shadow-xl transition-all"
              style={{ backgroundColor: COLORS.darkGreen }}
              aria-label="Explore Collection"
            >
              Explore Collection
              <ArrowRight className="ml-2" size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('our-story')}
              className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base tracking-wide shadow-xl transition-all border-2 backdrop-blur-md bg-white/20 border-white/50 text-white hover:bg-white/30"
              aria-label="Meet the Women"
            >
              Meet the Women
              <Users className="ml-2" size={18} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

// --- Toast Notification Component ---
const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 md:top-6 md:right-6 z-[200] bg-green-50 border-2 border-green-200 rounded-lg px-4 py-2 shadow-lg"
    >
      <div className="flex items-center space-x-2">
        <span className="text-green-700 font-bold text-sm">✓ {message}</span>
      </div>
    </motion.div>
  );
};

// --- Product Detail Modal Component ---
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
        message="Product added to cart!" 
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

                    {/* Price Display */}
                    {selectedVariant && selectedVariant.inStock && (
                      <div className="mb-4 p-3 rounded-xl bg-gradient-to-br" style={{ 
                        background: `linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.white} 100%)`,
                        border: `2px solid ${COLORS.goldenYellow}`
                      }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold tracking-wider uppercase mb-0.5" style={{ color: COLORS.darkGreen }}>
                              Price
                            </p>
                            <p className="text-2xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                              ₹{selectedVariant.price}
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: COLORS.goldenYellow }}>
                            <Leaf size={26} style={{ color: COLORS.darkGreen }} />
                          </div>
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
                        <span>Add to Cart</span>
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

const ProductCarousel = ({ onProductClick }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-1 overflow-visible">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{
          clickable: true,
          el: paginationRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.params.pagination.el = paginationRef.current;
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
        className="product-swiper"
      >
        {PRODUCTS.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-card-wrapper">
              <div 
                onClick={() => onProductClick(product)}
                className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl overflow-hidden shadow-2xl h-full border-2 transition-all duration-500 cursor-pointer product-card flex flex-col"
                style={{ borderColor: 'rgba(3, 66, 37, 0.3)' }}
              >
                {/* Image Container - 50% height, 100% width, no padding */}
                <div className="relative flex-[0_0_50%] overflow-hidden bg-white">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain m-0 p-0"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                  
                  {/* Stock Badge */}
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 z-20">
                      <div className="px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 backdrop-blur-lg shadow-xl border border-red-400/50">
                        <span className="text-[10px] md:text-xs font-bold text-white">Out of Stock</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-3 md:p-3.5 flex flex-col bg-white relative flex-1">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.02]"
                       style={{ 
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                       }}></div>
                  
                  <h3 className="text-sm md:text-base font-serif font-bold mb-1 relative z-10" style={{ color: COLORS.darkGreen }}>
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-1.5 text-[10px] md:text-xs line-clamp-2 flex-grow relative z-10 leading-relaxed">
                    {product.desc}
                  </p>
                  
                  {/* Price Display */}
                  {product.inStock && product.variants && product.variants.length > 0 && (
                    <div className="mb-1.5 relative z-10">
                      <div className="flex items-baseline justify-between">
                        <p className="text-lg md:text-xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                          ₹{product.variants[0].price}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500 font-medium">{product.variants[0].size}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button 
        ref={navigationPrevRef}
        className="swiper-button-prev-custom absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-2 md:p-3 rounded-full shadow-xl hover:bg-white transition-all transform hover:scale-110 z-30 border border-gray-200"
        style={{ color: COLORS.darkGreen }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button 
        ref={navigationNextRef}
        className="swiper-button-next-custom absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-2 md:p-3 rounded-full shadow-xl hover:bg-white transition-all transform hover:scale-110 z-30 border border-gray-200"
        style={{ color: COLORS.darkGreen }}
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Custom Pagination (Mobile only) */}
      <div ref={paginationRef} className="swiper-pagination-custom flex justify-center gap-2 mt-6 md:hidden"></div>

      {/* Custom Styles */}
      <style>{`
        .product-swiper {
          padding: 12px 30px 0 30px;
          min-height: 100%;
          overflow: visible;
        }
        
        .product-swiper .swiper-wrapper {
          align-items: center;
          min-height: 100%;
        }
        
        @media (max-width: 640px) {
          .product-swiper {
            padding: 10px 24px 0 24px;
          }
        }

        /* Hide default Swiper navigation and pagination */
        .product-swiper .swiper-button-next,
        .product-swiper .swiper-button-prev {
          display: none;
        }

        .product-card-wrapper {
          transition: transform 0.5s ease, opacity 0.5s ease;
          transform: scale(0.85);
          opacity: 0.4;
        }

        .swiper-slide-active .product-card-wrapper {
          transform: scale(1.05);
          opacity: 1;
          z-index: 10;
        }

        .swiper-slide-active .product-card {
          border-color: ${COLORS.goldenYellow} !important;
          border-width: 3px !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 2px rgba(249, 176, 0, 0.6), 0 0 20px rgba(249, 176, 0, 0.3) !important;
        }

        @media (max-width: 640px) {
          .swiper-slide-active .product-card-wrapper {
            transform: scale(1.03);
          }
        }

        /* Immediate neighbors (-1 and 1) - less faded */
        .swiper-slide-prev .product-card-wrapper,
        .swiper-slide-next .product-card-wrapper {
          transform: scale(0.9);
          opacity: 0.6;
        }

        /* Further away cards (-2 and 2) - more faded */
        .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) .product-card-wrapper {
          transform: scale(0.85);
          opacity: 0.4;
        }

        /* Navigation button styles */
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          z-index: 30;
        }

        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.35;
          cursor: auto;
          pointer-events: none;
        }

        /* Pagination styles */
        .swiper-pagination-custom {
          position: relative !important;
          text-align: center;
          margin-top: 2.5rem;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        
        @media (max-width: 640px) {
          .swiper-pagination-custom {
            margin-top: 2rem;
          }
        }

        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: ${COLORS.darkGreen};
          opacity: 0.3;
          margin: 0 !important;
          transition: all 0.3s ease;
          border-radius: 50%;
          cursor: pointer;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
          opacity: 1;
          background: ${COLORS.goldenYellow};
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());
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
    if (element) {
      const navHeight = 80; // Approximate nav height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
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
          className={`fixed w-full z-50 transition-all duration-300 py-2 shadow-md`}
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
    <div className="min-h-screen font-sans relative overflow-hidden" style={{ backgroundColor: COLORS.cream, color: COLORS.darkGreen }}>
      
      {/* Decorative Background Leaves */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          style={{ 
            position: 'absolute',
            top: '15%', 
            left: '5%', 
            transform: 'rotate(-25deg)',
            opacity: 0.15
          }}
        >
          <Leaf 
            size={50} 
            color={COLORS.darkGreen}
            strokeWidth={1}
          />
        </div>
        <div 
          style={{ 
            position: 'absolute',
            top: '60%', 
            right: '8%', 
            transform: 'rotate(45deg)',
            opacity: 0.15
          }}
        >
          <Leaf 
            size={60} 
            color={COLORS.darkGreen}
            strokeWidth={1}
          />
        </div>
        <div 
          className="hidden md:block"
          style={{ 
            position: 'absolute',
            bottom: '20%', 
            left: '10%', 
            transform: 'rotate(15deg)',
            opacity: 0.15
          }}
        >
          <Leaf 
            size={40} 
            color={COLORS.darkGreen}
            strokeWidth={1}
          />
        </div>
        {/* Center leaf */}
        <div 
          className="hidden md:block"
          style={{ 
            position: 'absolute',
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%) rotate(30deg)',
            opacity: 0.12
          }}
        >
          <Leaf 
            size={45} 
            color={COLORS.darkGreen}
            strokeWidth={1}
          />
        </div>
        {/* Top center leaf */}
        <div 
          style={{ 
            position: 'absolute',
            top: '8%', 
            left: '50%', 
            transform: 'translateX(-50%) rotate(-10deg)',
            opacity: 0.15
          }}
        >
          <Leaf 
            size={35} 
            color={COLORS.darkGreen}
            strokeWidth={1}
          />
        </div>
        {/* Bottom right leaf */}
        <div 
          className="hidden md:block"
          style={{ 
            position: 'absolute',
            bottom: '15%', 
            right: '12%', 
            transform: 'rotate(-35deg)',
            opacity: 0.15
          }}
        >
          <Leaf 
            size={50} 
            color={COLORS.darkGreen}
            strokeWidth={1}
          />
        </div>
        {/* Middle left leaf */}
        <div 
          className="hidden md:block"
          style={{ 
            position: 'absolute',
            top: '40%', 
            left: '3%', 
            transform: 'rotate(20deg)',
            opacity: 0.13
          }}
        >
          <Leaf 
            size={40} 
            color={COLORS.darkGreen}
            strokeWidth={1}
          />
        </div>
        {/* Middle right leaf */}
        <div 
          className="hidden md:block"
          style={{ 
            position: 'absolute',
            top: '35%', 
            right: '5%', 
            transform: 'rotate(-20deg)',
            opacity: 0.14
          }}
        >
          <Leaf 
            size={50} 
            color={COLORS.darkGreen}
            strokeWidth={1}
          />
        </div>
      </div>
      
      {/* --- Navigation --- */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-1.5 shadow-md' : 'py-2'} bg-white`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div onClick={() => window.scrollTo(0,0)}>
             <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-medium tracking-wide text-sm">
            {['Collection', 'Our Tea Gardens', 'Our Story', 'Impact'].map((item) => (
              <button 
                key={item} 
                onClick={() => {
                  setCurrentPage('home');
                  scrollToSection(item.toLowerCase().replace(/\s+/g, '-'));
                }}
                className="hover:opacity-70 transition-opacity relative group"
                style={{ color: COLORS.darkGreen }}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: COLORS.goldenYellow }}></span>
              </button>
            ))}
            {/* Cart Icon */}
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative hover:opacity-70 transition-opacity"
              style={{ color: COLORS.darkGreen }}
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
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 px-6 flex flex-col space-y-4">
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
      <HeroSection scrollToSection={scrollToSection} />

      {/* --- Products Section --- */}
      <section id="collection" className="pt-6 md:pt-10 pb-12 md:pb-20 relative z-10 overflow-visible">
        <h2 
          className="text-2xl md:text-4xl font-serif font-bold mb-3 md:mb-4 text-center"
          style={{ color: COLORS.darkGreen }}
        >
          Collection
        </h2>
        <ProductCarousel onProductClick={handleProductClick} />
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onAddToCart={addToCart}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      {/* --- Our Tea Gardens Section --- */}
      <section id="our-tea-gardens" className="pt-6 md:pt-10 pb-12 md:pb-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 
            className="text-2xl md:text-4xl font-serif font-bold mb-3 md:mb-4 text-center"
            style={{ color: COLORS.darkGreen }}
          >
            Our Tea Gardens
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-8 md:mb-10 text-base md:text-lg text-gray-700">
             Discover the soul of Darjeeling through the unique offerings of seven remarkable tea estates. 
             Each garden tells a story—of tradition, craftsmanship, and the women who bring these creations to life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEA_GARDENS.map((garden, idx) => {
              const IconComponent = TEA_GARDEN_ICONS[garden.name];
              const gradientClass = TEA_GARDEN_GRADIENTS[garden.name];
              const isFlipped = flippedCards.has(idx);
              
              const handleCardClick = (e) => {
                // Only handle click on mobile devices
                if (window.innerWidth < 768) {
                  e.stopPropagation();
                  setFlippedCards(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(idx)) {
                      newSet.delete(idx);
                    } else {
                      newSet.add(idx);
                    }
                    return newSet;
                  });
                }
              };
              
              return (
              <div 
                key={idx} 
                className="group rounded-xl [perspective:1000px] relative animate-fade-in-up cursor-pointer touch-manipulation" 
                style={{
                  height: '320px',
                  animationDelay: `${idx * 100}ms`,
                  animationFillMode: 'both'
                }}
                onClick={handleCardClick}
              >
                <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''} md:group-hover:[transform:rotateY(180deg)] md:group-hover:scale-[1.02]`}>
                  {/* Front Face */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden shadow-2xl bg-white flex flex-col border-2 transition-all duration-500 group-hover:shadow-3xl"
                       style={{ 
                         borderColor: COLORS.darkGreen + '30',
                         boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                       }}>
                    {/* Icon Section with Gradient */}
                    <div className={`relative h-28 md:h-30 bg-gradient-to-br ${gradientClass.front} overflow-hidden flex items-center justify-center border-b-2`}
                         style={{ borderColor: COLORS.darkGreen + '15' }}>
                      {/* Decorative Tea Leaf Pattern - Very Subtle */}
                      <div className="absolute inset-0 opacity-[0.03]"
                           style={{ 
                             backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M150,100 Q155,85 160,100 Q165,115 160,130 Q155,145 150,130 Q145,115 150,100 Z' fill='%23034225' opacity='0.15'/%3E%3Cpath d='M150,100 L160,130' stroke='%23034225' stroke-width='1' opacity='0.2'/%3E%3Cpath d='M150,110 Q152,110 154,112' stroke='%23034225' stroke-width='0.5' fill='none' opacity='0.15'/%3E%3Cpath d='M150,120 Q152,120 154,122' stroke='%23034225' stroke-width='0.5' fill='none' opacity='0.15'/%3E%3C/g%3E%3C/svg%3E")`
                           }}
                      ></div>
                      {/* Large Icon with glow effect */}
                      <div className="relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <div className="absolute inset-0 blur-2xl opacity-30" style={{ backgroundColor: COLORS.goldenYellow }}></div>
                        <IconComponent 
                          size={56} 
                          className="md:w-[60px] md:h-[60px] drop-shadow-2xl relative"
                          style={{ color: COLORS.darkGreen }}
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                    {/* Content Section */}
                    <div className="p-3 md:p-4 flex-grow flex flex-col bg-white relative">
                      <div className="flex items-center mb-2">
                        <div className="p-1 rounded-full mr-2" style={{ backgroundColor: COLORS.goldenYellow + '20' }}>
                          <MapPin className="flex-shrink-0" size={12} style={{ color: COLORS.goldenYellow }} />
                        </div>
                        <h3 className="text-base md:text-lg font-serif font-bold transition-colors" style={{ color: COLORS.darkGreen }}>{garden.name}</h3>
                      </div>
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3 flex-grow mb-3">{garden.desc}</p>
                      {/* Show More Button */}
                      <div className="flex justify-center mt-auto">
                        <button 
                          className="px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 group-hover:scale-105 flex items-center gap-1.5 shadow-md hover:shadow-lg active:scale-95"
                          style={{ 
                            backgroundColor: COLORS.darkGreen,
                            color: COLORS.white
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick();
                          }}
                        >
                          <span>Read Full Story</span>
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
 
                  {/* Back Face */}
                  <div className={`absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden shadow-2xl flex flex-col p-3 md:p-4 relative bg-gradient-to-br ${gradientClass.back}`}>
                    {/* Decorative Tea Leaf Pattern Overlay - Very Subtle */}
                    <div className="absolute inset-0 opacity-[0.06]"
                         style={{ 
                           backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M150,100 Q155,85 160,100 Q165,115 160,130 Q155,145 150,130 Q145,115 150,100 Z' fill='%23ffffff' opacity='0.25'/%3E%3Cpath d='M150,100 L160,130' stroke='%23ffffff' stroke-width='1.5' opacity='0.3'/%3E%3Cpath d='M150,110 Q152,110 154,112' stroke='%23ffffff' stroke-width='0.8' fill='none' opacity='0.25'/%3E%3Cpath d='M150,120 Q152,120 154,122' stroke='%23ffffff' stroke-width='0.8' fill='none' opacity='0.25'/%3E%3C/g%3E%3C/svg%3E")`
                         }}
                    ></div>
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Content - No overflow, all content fits */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Mobile close button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick();
                        }}
                        className="md:hidden absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                        aria-label="Close"
                      >
                        <X size={16} className="text-white" />
                      </button>
                      
                      {/* Header with icon and name */}
                      <div className="flex items-center mb-2 pb-2 border-b-2 border-white/30 pr-8 md:pr-0">
                        <div className="p-1.5 rounded-lg bg-white/25 backdrop-blur-sm mr-2 shadow-lg">
                          <IconComponent size={16} className="md:w-[18px] md:h-[18px]" style={{ color: '#fff' }} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-sm md:text-base font-serif font-bold text-white drop-shadow-lg leading-tight">{garden.name}</h3>
                      </div>
                      
                      {/* Description - fits within available space, no scrolling */}
                      <div className="flex-grow flex items-start pt-0.5">
                        <p className="text-white text-[10px] md:text-[11px] leading-[1.4] font-medium md:font-bold drop-shadow-md"
                           style={{ 
                             textShadow: '0 2px 4px rgba(0,0,0,0.4)'
                           }}>
                          {garden.desc}
                        </p>
                      </div>
                      
                      {/* Location badge at bottom */}
                      <div className="mt-2 pt-2 border-t-2 border-white/30 flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin size={12} className="mr-1.5 text-white drop-shadow" />
                          <span className="text-[10px] md:text-xs font-bold text-white drop-shadow uppercase tracking-wider">Darjeeling</span>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-white/25 backdrop-blur-sm">
                          <span className="text-[10px] md:text-xs font-bold text-white drop-shadow">Tea Estate</span>
                        </div>
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
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Our Story Section --- */}
      <section id="our-story" className="pt-6 md:pt-10 pb-12 md:pb-20 relative overflow-hidden z-10" style={{ backgroundColor: COLORS.cream }}>
         {/* Decorative leaf background */}
        <Leaf className="hidden md:block absolute top-10 right-10 w-64 h-64 text-green-800 opacity-5 rotate-45" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative group">
              {/* Decorative floating elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 rounded-full opacity-20 blur-xl transition-all duration-700 group-hover:opacity-30 group-hover:scale-110" style={{ backgroundColor: COLORS.goldenYellow }}></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 rounded-full opacity-15 blur-2xl transition-all duration-700 group-hover:opacity-25 group-hover:scale-110" style={{ backgroundColor: COLORS.darkGreen }}></div>
              
              {/* Modern layered frame effect */}
              <div className="relative">
                {/* Outer glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" style={{ backgroundColor: COLORS.goldenYellow, transform: 'scale(1.05)' }}></div>
                
                {/* Main image container with modern styling */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 p-4 md:p-5 transform transition-all duration-500 group-hover:scale-[1.02]">
                  {/* Subtle inner border gradient */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ 
                    background: `linear-gradient(135deg, ${COLORS.goldenYellow}15 0%, transparent 50%, ${COLORS.darkGreen}10 100%)`,
                    padding: '2px'
                  }}></div>
                  
                  {/* Image with elegant frame */}
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none"></div>
                    <img 
                      src="/assets/origins_bk.png" 
                      alt="Woman harvesting tea" 
                      className="w-full h-[280px] md:h-[320px] object-contain transition-all duration-700 group-hover:scale-105"
                    />
                    
                    {/* Subtle corner accents */}
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 w-8 h-8 md:w-10 md:h-10 border-t-2 border-l-2 rounded-tl-lg opacity-30 transition-opacity duration-500 group-hover:opacity-50" style={{ borderColor: COLORS.goldenYellow }}></div>
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 border-t-2 border-r-2 rounded-tr-lg opacity-30 transition-opacity duration-500 group-hover:opacity-50" style={{ borderColor: COLORS.goldenYellow }}></div>
                    <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-8 h-8 md:w-10 md:h-10 border-b-2 border-l-2 rounded-bl-lg opacity-30 transition-opacity duration-500 group-hover:opacity-50" style={{ borderColor: COLORS.goldenYellow }}></div>
                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-8 h-8 md:w-10 md:h-10 border-b-2 border-r-2 rounded-br-lg opacity-30 transition-opacity duration-500 group-hover:opacity-50" style={{ borderColor: COLORS.goldenYellow }}></div>
                  </div>
                </div>
                
                {/* Floating decorative leaf elements */}
                <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-12 h-12 md:w-16 md:h-16 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:rotate-12">
                  <Leaf size={48} className="md:w-16 md:h-16" style={{ color: COLORS.darkGreen }} />
                </div>
                <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-10 h-10 md:w-12 md:h-12 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:-rotate-12">
                  <Leaf size={36} className="md:w-12 md:h-12" style={{ color: COLORS.goldenYellow }} />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase mb-1.5" style={{ color: COLORS.goldenYellow }}>Our Origins</h3>
              <h2 
                className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-5 text-left"
                style={{ color: COLORS.darkGreen }}
              >
                Rooted in Darjeeling
              </h2>
              
              <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-700">
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
            </div>
          </div>
        </div>
      </section>

      {/* --- Our Impact Section --- */}
      <section id="impact" className="pt-6 md:pt-10 pb-12 md:pb-20 relative bg-white z-10">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 
            className="text-2xl md:text-4xl font-serif font-bold mb-3 md:mb-4 text-center"
            style={{ color: COLORS.darkGreen }}
          >
            Our Impact
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-6 md:mb-8 text-base md:text-lg">
             Over 5,000 households touched through training and support to create unique, value-added products using local resources. We are reviving income, dignity, and hope for the communities of Darjeeling.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {IMPACT_STATS.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 p-4 md:p-6 rounded-3xl shadow-sm hover:shadow-xl transition-shadow text-center group border border-transparent hover:border-green-100"
              >
                <div 
                  className="w-16 h-16 md:w-[72px] md:h-[72px] mx-auto rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: COLORS.cream }}
                >
                  <stat.icon size={28} className="md:w-8 md:h-8" style={{ color: COLORS.darkGreen }} />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-bold mb-1.5" style={{ color: COLORS.goldenYellow }}>
                  {stat.value}
                </h3>
                <h4 className="text-lg md:text-xl font-bold mb-1.5" style={{ color: COLORS.darkGreen }}>{stat.label}</h4>
                <p className="text-xs md:text-sm text-gray-500">Restoring livelihoods and creating sustainable futures.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="text-white py-8 px-6 relative z-10" style={{ backgroundColor: COLORS.darkGreen }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 border-b border-green-800 pb-6">
          {/* Column 1: Info & Social */}
          <div className="md:col-span-1">
             <div className="flex items-center space-x-2 mb-3">
                <Leaf className="text-white" size={58} />
                <span className="font-serif font-bold text-base tracking-wider">GHARELU ORIGINS</span>
             </div>
             <p className="text-green-200 text-xs leading-relaxed mb-4">
               Rooted in Darjeeling, Grown with Purpose. Bringing the Himalayas to your doorstep.
             </p>
             <div className="flex space-x-3">
               {SOCIAL_LINKS.map((social, i) => (
                 <a 
                    key={i} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center hover:bg-white hover:text-green-900 transition-colors"
                 >
                   <social.icon size={14} />
                 </a>
               ))}
             </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-bold mb-3 text-green-300 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-2 text-green-100 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="font-bold mb-3 text-green-300 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-green-200 text-xs mb-3">Join our community for harvest updates.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-3 py-2 text-xs rounded-l-lg bg-green-800 border-none text-white placeholder-green-400 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <button 
                className="px-4 py-2 text-xs rounded-r-lg font-bold transition-colors hover:bg-yellow-400"
                style={{ backgroundColor: COLORS.goldenYellow, color: COLORS.darkGreen }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-4 text-center text-green-400 text-xs">
          &copy; {new Date().getFullYear()} Gharelu Origins. All rights reserved.
        </div>
      </footer>
    </div>
  );
}