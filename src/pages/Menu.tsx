import { useState } from 'react';
import { ArrowLeftIcon, SlidersHorizontalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data';
import ProductCard from '../components/ProductCard';
import { useFilterStore } from '../store';

const CATEGORIES = [
  { name: 'All', emoji: '✨' },
  { name: 'Cakes', emoji: '🎂' },
  { name: 'Pastries', emoji: '🥐' },
  { name: 'Cookies', emoji: '🍪' },
  { name: 'Breads', emoji: '🍞' },
  { name: 'Muffins', emoji: '🧁' },
];

const FLAVOURS = ['Chocolate', 'Vanilla', 'Strawberry', 'Butterscotch', 'Red Velvet'];
const TYPES = ['Egg', 'Eggless', 'Vegan'];

export default function Menu() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const { 
    category, maxPrice, flavours, types, 
    setCategory, setMaxPrice, toggleFlavour, toggleType, resetFilters 
  } = useFilterStore();

  const filteredProducts = products.filter(p => {
    const matchesCategory = category === 'All' || p.category === category;
    const matchesPrice = p.price <= maxPrice;
    const matchesFlavour = flavours.length === 0 || flavours.includes(p.flavour);
    const matchesType = types.length === 0 || types.includes(p.type);
    return matchesCategory && matchesPrice && matchesFlavour && matchesType;
  });

  return (
    <div 
      className="p-6 flex flex-col min-h-full flex-1 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/Background image for menu.jpeg')" }}
    >
      <div className="absolute inset-0 bg-bgLight/70 backdrop-blur-[2px]"></div>
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-textDark hover:bg-softPink rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-xl font-bold text-textDark">Our Menu</h1>
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className={`p-2 -mr-2 rounded-full transition-colors ${showFilters ? 'bg-primary text-white' : 'text-textDark hover:bg-softPink'}`}
          >
            <SlidersHorizontalIcon className="w-5 h-5" />
          </button>
        </header>

        {/* Categories */}
        <div className="mb-4">
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-200 ${
                  category === cat.name 
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

        {/* Collapsible Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-borderSoft p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading font-semibold text-textDark">Filters</h3>
                  <button onClick={resetFilters} className="text-xs text-primary font-medium hover:underline">Reset All</button>
                </div>
                
                {/* Price Slider */}
                <div className="mb-5">
                  <label className="text-xs font-medium text-textMid mb-2 flex justify-between">
                    <span>Price Range</span>
                    <span className="text-textDark font-bold">₹50 - ₹{maxPrice}</span>
                  </label>
                  <input 
                    type="range" 
                    min="50" max="1500" step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-softPink rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Flavours */}
                <div className="mb-5">
                  <label className="text-xs font-medium text-textMid mb-2 block">Flavour</label>
                  <div className="flex flex-wrap gap-2">
                    {FLAVOURS.map(f => (
                      <button
                        key={f}
                        onClick={() => toggleFlavour(f)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                          flavours.includes(f) ? 'bg-primary border-primary text-white' : 'bg-transparent border-borderSoft text-textMid hover:border-primary/50'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Types */}
                <div>
                  <label className="text-xs font-medium text-textMid mb-2 block">Dietary</label>
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map(t => (
                      <button
                        key={t}
                        onClick={() => toggleType(t)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                          types.includes(t) ? 'bg-textDark border-textDark text-white' : 'bg-transparent border-borderSoft text-textMid hover:border-textDark/50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-1 pb-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-4xl block mb-3">🧐</span>
              <p className="text-textDark font-medium mb-1">No items match your filters</p>
              <button onClick={resetFilters} className="text-primary text-sm font-medium">Clear Filters</button>
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
