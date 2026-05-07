import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
import { HeartIcon as HeartSolid } from 'lucide-react';
import type { Product } from '../data';
import { useCartStore, useWishlistStore } from '../store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);
  
  const [flyEmoji, setFlyEmoji] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setClickPos({ x: e.clientX, y: e.clientY });
    setFlyEmoji(true);
    addItem(product);
    setTimeout(() => setFlyEmoji(false), 800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(180,120,100,0.12), 0 8px 10px -6px rgba(180,120,100,0.1)' }}
        className="bg-cardBg rounded-2xl p-3 shadow-warm relative flex flex-col h-full border border-borderSoft/50"
      >
        <button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-textMid hover:text-accent transition-colors"
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            {wishlisted ? <HeartSolid className="w-4 h-4 text-accent fill-accent" /> : <HeartIcon className="w-4 h-4" />}
          </motion.div>
        </button>
        
        <div className="aspect-square bg-softPink/30 rounded-xl mb-3 flex items-center justify-center text-5xl relative overflow-hidden">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span>{product.emoji}</span>
          )}
          {product.isTrending && (
             <div className="absolute bottom-2 left-2 bg-accent text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
               Trending
             </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="text-[10px] text-accent font-medium mb-1 uppercase tracking-wide bg-softPink w-max px-1.5 py-0.5 rounded">
            {product.flavour}
          </div>
          <h3 className="font-heading font-semibold text-textDark text-sm leading-tight mb-1">{product.name}</h3>
          
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="font-bold text-textDark">
              <span className="text-xs">₹</span>{product.price}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="bg-primary hover:bg-accent text-white w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="text-lg leading-none mb-0.5">+</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Floating Emoji Animation */}
      <AnimatePresence>
        {flyEmoji && (
          <motion.div
            initial={{ x: clickPos.x - 20, y: clickPos.y - 20, opacity: 1, scale: 1 }}
            animate={{ 
              x: window.innerWidth / 2, // Approximate center bottom where cart is
              y: window.innerHeight - 50, 
              opacity: 0, 
              scale: 0.5 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none', fontSize: '2rem' }}
          >
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-xl shadow-lg" />
            ) : (
              product.emoji
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
