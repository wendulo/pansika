// Local fallback data so the UI still works even before hitting the backend.
export const sampleStores = [
  {
    id: 1,
    name: "Chipiku Plus – Area 47",
    city: "Lilongwe",
    store_type: "groceries",
    image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    tags: "Groceries"
  },
  {
    id: 2,
    name: "Game Stores – Lilongwe",
    city: "Lilongwe",
    store_type: "mixed",
    image_url: "https://images.unsplash.com/photo-1506617420156-8e4536971650",
    tags: "Groceries & Electronics"
  },
  {
    id: 3,
    name: "ElectroWorld – Blantyre",
    city: "Blantyre",
    store_type: "electronics",
    image_url: "https://images.unsplash.com/photo-1511381939415-c1b33e25c1c2",
    tags: "Electronics"
  }
];

export const sampleCategories = [
  "Vegetables",
  "Fruits",
  "Milk & Eggs",
  "Drinks",
  "Meats",
  "Bakery",
  "Phones",
  "TVs",
  "Laptops",
  "Accessories"
];

export const sampleProducts = [
  {
    id: 101,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    unit: "1 Kg",
    price: 2500,
    store: sampleStores[0],
    description: "Locally sourced tomatoes perfect for relish.",
    image_url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    rating: 4.4,
    discount_percent: 10
  },
  {
    id: 102,
    name: "Rape Greens",
    category: "Vegetables",
    unit: "1 Kg",
    price: 1800,
    store: sampleStores[0],
    description: "Fresh leafy rape greens from local farmers.",
    image_url: "https://images.unsplash.com/photo-1546470427-0e4ecf7d1b5f",
    rating: 4.6,
    discount_percent: 15
  },
  {
    id: 103,
    name: "Samsung Galaxy A24",
    category: "Phones",
    unit: "1 pc",
    price: 350000,
    store: sampleStores[1],
    description: "Popular mid-range smartphone with great battery.",
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    rating: 4.5,
    discount_percent: 5
  },
  {
    id: 104,
    name: "Hisense 55\" 4K TV",
    category: "TVs",
    unit: "1 pc",
    price: 420000,
    store: sampleStores[2],
    description: "4K UHD Smart TV perfect for the living room.",
    image_url: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
    rating: 4.4,
    discount_percent: 7
  }
];
