export type Product = {
  id: string;
  name: string;
  category: "Cakes" | "Pastries" | "Cookies" | "Breads" | "Muffins";
  flavour: "Chocolate" | "Vanilla" | "Strawberry" | "Butterscotch" | "Red Velvet" | "All";
  type: "Egg" | "Eggless" | "Vegan" | "All";
  price: number;
  emoji: string;
  imageUrl?: string;
  rating: number;
  isBestSeller?: boolean;
  isTrending?: boolean;
  description?: string;
};

export const products: Product[] = [
  { id:"1", name:"Chocolate Dream Cake", category:"Cakes", flavour:"Chocolate", type:"Egg", price:699, emoji:"🎂", imageUrl: "/images/Chocolate_Dream_Cake_realistic_feel_202605061353.jpeg", rating:4.9, isBestSeller:true },
  { id:"2", name:"Vanilla Cloud Cake", category:"Cakes", flavour:"Vanilla", type:"Eggless", price:599, emoji:"🍰", imageUrl: "/images/Vanilla_Cloud_Cake_202605061355.jpeg", rating:4.7, isBestSeller:true },
  { id:"3", name:"Red Velvet Royale", category:"Cakes", flavour:"Red Velvet", type:"Egg", price:799, emoji:"🎂", imageUrl: "/images/Red_Velvet_Royale_202605061359.jpeg", rating:4.8, isBestSeller:false },
  { id:"4", name:"Strawberry Pastry", category:"Pastries", flavour:"Strawberry", type:"Egg", price:149, emoji:"🥐", imageUrl: "/images/Strawberry_Pastry_202605061356.jpeg", rating:4.6, isBestSeller:true },
  { id:"5", name:"Butter Croissant", category:"Pastries", flavour:"Vanilla", type:"Egg", price:99, emoji:"🥐", imageUrl: "/images/Butter_Croissant_202605061401.jpeg", rating:4.5 },
  { id:"6", name:"Choco Chip Cookies", category:"Cookies", flavour:"Chocolate", type:"Egg", price:249, emoji:"🍪", imageUrl: "/images/Choco_Chip_Cookies_202605061356.jpeg", rating:4.8, isBestSeller:true },
  { id:"7", name:"Butter Nankhatai", category:"Cookies", flavour:"Vanilla", type:"Eggless", price:199, emoji:"🍪", imageUrl: "/images/Butter_Nankhatai_202605061403.jpeg", rating:4.4 },
  { id:"8", name:"Artisan Sourdough", category:"Breads", flavour:"Vanilla", type:"Vegan", price:299, emoji:"🍞", imageUrl: "/images/Artisan_Sourdough_202605061404.jpeg", rating:4.7 },
  { id:"9", name:"Multigrain Loaf", category:"Breads", flavour:"Vanilla", type:"Vegan", price:249, emoji:"🍞", imageUrl: "/images/Multigrain_Loaf_202605061404.jpeg", rating:4.3 },
  { id:"10", name:"Blueberry Muffin", category:"Muffins", flavour:"Vanilla", type:"Egg", price:129, emoji:"🧁", imageUrl: "/images/Blueberry_Muffin_202605061356.jpeg", rating:4.6, isBestSeller:true },
  { id:"11", name:"Choco Lava Muffin", category:"Muffins", flavour:"Chocolate", type:"Egg", price:149, emoji:"🧁", imageUrl: "/images/Choco_Lava_Muffin_202605061405.jpeg", rating:4.8 },
  { id:"12", name:"Butterscotch Cake", category:"Cakes", flavour:"Butterscotch", type:"Eggless", price:649, emoji:"🎂", imageUrl: "/images/Butterscotch_Cake_202605061359.jpeg", rating:4.5 },
  { id:"13", name:"Vegan Brownie", category:"Cookies", flavour:"Chocolate", type:"Vegan", price:179, emoji:"🍫", imageUrl: "/images/Vegan_Brownie_202605061403.jpeg", rating:4.4 },
  { id:"14", name:"Strawberry Shortcake", category:"Cakes", flavour:"Strawberry", type:"Egg", price:749, emoji:"🍰", imageUrl: "/images/Strawberry_Shortcake_202605061359.jpeg", rating:4.7 },
  { id:"15", name:"Almond Danish", category:"Pastries", flavour:"Vanilla", type:"Egg", price:129, emoji:"🥐", imageUrl: "/images/Almond_Danish_202605061401.jpeg", rating:4.5 },
  { id:"16", name:"Cinnamon Roll", category:"Pastries", flavour:"Vanilla", type:"Eggless", price:119, emoji:"🌀", imageUrl: "/images/Cinnamon_Roll_202605061403.jpeg", rating:4.6, isTrending:true }
];
