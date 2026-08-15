import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const initialProducts = [
  {
    id: "prod-sidama-coffee",
    title: "Premium Sidama Coffee",
    category: "Coffee",
    price: 650,
    unit: "kg",
    rating: 4.8,
    reviewsCount: 124,
    grade: "PREMIUM GRADE A",
    region: "Sidama Region, Southern Ethiopia",
    farmer: "Yirgacheffe Union",
    salesCount: 84,
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=300&q=80"
    ],
    roastLevel: "Medium-Dark",
    qualityGrade: "G1 Organic",
    processing: "Washed",
    altitude: "1,900 - 2,200m",
    description: "Sourced from the heart of the Sidama region, this coffee offers a vibrant acidity coupled with a rich, floral aroma. Notes of jasmine, lemon, and a subtle chocolate finish define this world-renowned crop. Each batch is manually sorted and AI-verified for moisture consistency and bean size uniformity.",
    aiAdvice: "Current price is 8% lower than the 30-day average for Sidama Grade A. Predictive models suggest a seasonal uptick in demand next month. Recommended for bulk purchase now."
  },
  {
    id: "prod-white-teff",
    title: "White Teff (Magna)",
    category: "Grains",
    price: 150,
    unit: "kg",
    rating: 4.9,
    reviewsCount: 210,
    grade: "PREMIUM QUALITY",
    region: "Gojjam, Amhara Region",
    farmer: "Biftu Gudina Coop",
    salesCount: 142,
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80"
    ],
    roastLevel: "N/A",
    qualityGrade: "Super Magna",
    processing: "Sun Dried & AI Cleaned",
    altitude: "1,800 - 2,400m",
    description: "High-grade Magna Teff, iron-rich and gluten-free. Grown in nutrient-rich soils of Gojjam using traditional sustainable methods.",
    aiAdvice: "White Teff prices in the Addis Ababa market are expected to rise by 6% due to seasonal demand shifts. Securing supply early saves up to ETB 12/kg."
  },
  {
    id: "prod-yirgacheffe-coffee",
    title: "Yirgacheffe Coffee",
    category: "Coffee",
    price: 680,
    unit: "kg",
    rating: 4.9,
    reviewsCount: 98,
    grade: "ORGANIC CERTIFIED",
    region: "Gedeo, SNNPR",
    farmer: "Yirgacheffe Union",
    salesCount: 66,
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80"
    ],
    roastLevel: "Light-Medium",
    qualityGrade: "Grade 1 Specialty",
    processing: "Wet Processed",
    altitude: "1,750 - 2,200m",
    description: "Grade 1 Arabica beans with distinct floral and citrus notes. Clean cup quality with smooth wine-like finish.",
    aiAdvice: "High international export demand. Secure local allocation early."
  },
  {
    id: "prod-red-onions",
    title: "Red Onions",
    category: "Vegetables",
    price: 45,
    unit: "kg",
    rating: 4.6,
    reviewsCount: 88,
    grade: "GRADE A FRESH",
    region: "Meki, Oromia Region",
    farmer: "Meki Farmers Association",
    salesCount: 204,
    isOrganic: false,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8ce?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8ce?auto=format&fit=crop&w=300&q=80"
    ],
    roastLevel: "N/A",
    qualityGrade: "Grade A",
    processing: "Fresh Cured",
    altitude: "1,600m",
    description: "Firm, high-flavor red onions. Long shelf life, ideal for commercial wholesale buyers and restaurant chains.",
    aiAdvice: "Supply levels peak in 2 weeks. Bulk pricing available for orders > 500kg."
  },
  {
    id: "prod-nug-oil",
    title: "Niger Seed Oil (Nug)",
    category: "Oilseeds",
    price: 320,
    unit: "L",
    rating: 4.7,
    reviewsCount: 76,
    grade: "100% PURE",
    region: "Wollega, Oromia",
    farmer: "Wollega Agro Coop",
    salesCount: 110,
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80"
    ],
    roastLevel: "N/A",
    qualityGrade: "Cold Pressed",
    processing: "100% Cold Pressed",
    altitude: "1,900m",
    description: "Cold-pressed pure Nug oil. Rich in Omega-3 and natural antioxidants, unrefined and unadulterated.",
    aiAdvice: "Prices holding steady over 60 days. Reliable supply."
  },
  {
    id: "prod-haricot-beans",
    title: "Haricot Beans",
    category: "Grains",
    price: 90,
    unit: "kg",
    rating: 4.8,
    reviewsCount: 154,
    grade: "EXPORT QUALITY",
    region: "Rift Valley Region",
    farmer: "Rift Valley Farm Co.",
    salesCount: 190,
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=300&q=80"
    ],
    roastLevel: "N/A",
    qualityGrade: "Export Grade",
    processing: "Machine Cleaned",
    altitude: "1,500m",
    description: "Export quality white pea beans. Sorted, uniform size, perfect for canning and bulk culinary use.",
    aiAdvice: "Logistics batching available with neighboring regional shipments."
  },
  {
    id: "prod-korarima",
    title: "Korarima (Cardamom)",
    category: "Spices",
    price: 480,
    unit: "kg",
    rating: 5.0,
    reviewsCount: 62,
    grade: "WILD HARVEST",
    region: "Kaffa Forest, South",
    farmer: "Kaffa Forest Stewards",
    salesCount: 45,
    isOrganic: true,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    thumbnails: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80"
    ],
    roastLevel: "N/A",
    qualityGrade: "Wild Premium",
    processing: "Smoke Dried",
    altitude: "2,000m",
    description: "Wild-grown Ethiopian cardamom pods from the ancient Kaffa forest. Highly aromatic and smoky profile.",
    aiAdvice: "Limited seasonal harvest. High buyer demand."
  }
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState([
    {
      id: "prod-white-teff",
      title: "Premium White Teff",
      subtitle: "50kg Bulk Bag",
      price: 7500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "prod-fertilizer",
      title: "Organic NPK Fertilizer",
      subtitle: "25L Liquid",
      price: 1200,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=300&q=80"
    }
  ]);

  const [wishlist, setWishlist] = useState(["prod-sidama-coffee"]);
  
  const [userProfile] = useState({
    name: "Abebe Bikila",
    initials: "AB",
    phone: "+251 911 234 567",
    city: "Addis Ababa",
    subCity: "Bole Sub-City",
    woreda: "Woreda 03",
    houseNo: "House No. 445",
    role: "Verified Buyer / Wholesale Partner"
  });

  const [activeOrders, setActiveOrders] = useState([
    {
      id: "#ORD-8902",
      product: "Arabica Grade 1",
      farmer: "Biftu Gudina Coop",
      status: "In Transit",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      date: "Today, 10:45 AM",
      total: "18,400 ETB"
    },
    {
      id: "#ORD-9908",
      product: "Red Teff (Enset)",
      farmer: "Yirgacheffe Union",
      status: "Processing",
      statusColor: "bg-amber-100 text-amber-800 border-amber-300",
      date: "Yesterday, 03:20 PM",
      total: "11,385 ETB"
    }
  ]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          subtitle: product.unit ? `1 ${product.unit}` : "Standard Unit",
          price: product.price,
          quantity: quantity,
          image: product.image
        }
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      product: cart.map((i) => i.title).join(", "),
      farmer: "D-Agro Certified Network",
      status: "Processing",
      statusColor: "bg-amber-100 text-amber-800 border-amber-300",
      date: "Just Now",
      total: `${orderDetails.total.toLocaleString()} ETB`
    };
    setActiveOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vatAmount = Math.round(cartSubtotal * 0.15);
  const totalAmount = cartSubtotal + vatAmount;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        userProfile,
        activeOrders,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        placeOrder,
        cartSubtotal,
        vatAmount,
        totalAmount,
        products: initialProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
