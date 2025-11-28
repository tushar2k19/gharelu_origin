// --- Color Palette Constants ---
export const COLORS = {
  darkGreen: '#034225',
  goldenYellow: '#f9b000',
  cream: '#f8f5e3',
  white: '#ffffff'
};

// --- Products Data ---
export const PRODUCTS = [
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

