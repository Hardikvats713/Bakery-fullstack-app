import { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { products } from '../data';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { name: 'All', emoji: '✨' },
  { name: 'Cakes', emoji: '🎂' },
  { name: 'Pastries', emoji: '🥐' },
  { name: 'Cookies', emoji: '🍪' },
  { name: 'Breads', emoji: '🍞' },
  { name: 'Muffins', emoji: '🧁' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    // If not searching, just show best sellers for Home (or all if category selected)
    const isBestSeller = activeCategory === 'All' && !search ? p.isBestSeller : true;
    return matchesSearch && matchesCategory && isBestSeller;
  });

  return (
    <div 
      className="p-6 min-h-full flex-1 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/Main page backgound image.jpeg')" }}
    >
      <div className="absolute inset-0 bg-bgLight/70 backdrop-blur-[2px]"></div>
      <div className="relative z-10">
        {/* Header */}
        <header className="mb-6">
          <h2 className="text-textMid text-sm font-medium">Good morning 👋</h2>
          <h1 className="font-heading text-2xl font-bold text-textDark mt-1">Fresh baked with love</h1>
        </header>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-textLight" />
          </div>
          <input
            type="text"
            placeholder="Search for cakes, pastries..."
            className="w-full bg-white/90 backdrop-blur-sm border border-borderSoft rounded-2xl py-3 pl-11 pr-4 text-sm text-textDark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Offer Banner */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-primary to-accent rounded-3xl p-5 text-white mb-8 shadow-warm-lg relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-white/80 text-xs font-medium tracking-wider uppercase mb-1 block">Special Offer</span>
              <h3 className="font-heading font-bold text-2xl mb-1">20% OFF</h3>
              <p className="text-white/90 text-sm">On your first order</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-2 px-3 text-center">
              <span className="block text-[10px] text-white/80 uppercase tracking-widest mb-0.5">Code</span>
              <span className="font-bold tracking-wider">SWEET20</span>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.name 
                    ? 'bg-textDark text-white shadow-md' 
                    : 'bg-white/90 backdrop-blur-sm text-textMid border border-borderSoft hover:bg-softPink/50'
                }`}
              >
                <span className="text-lg">{cat.emoji}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-heading text-xl font-bold text-textDark">
              {search ? 'Search Results' : activeCategory === 'All' ? 'Best Sellers' : activeCategory}
            </h2>
            {activeCategory === 'All' && !search && (
              <a href="/items" className="text-primary text-sm font-medium hover:underline">See all</a>
            )}
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-4xl block mb-2">🧁</span>
              <p className="text-textMid">No items found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
