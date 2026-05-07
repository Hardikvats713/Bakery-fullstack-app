import { ArrowLeftIcon, HeartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlistStore } from '../store';
import { products } from '../data';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const navigate = useNavigate();
  const { ids } = useWishlistStore();
  
  const wishlistedProducts = products.filter(p => ids.includes(p.id));

  return (
    <div 
      className="p-6 flex flex-col min-h-full flex-1 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/backgrounds/Wishlist section Backgound image.jpeg')" }}
    >
      <div className="absolute inset-0 bg-bgLight/70 backdrop-blur-[2px]"></div>
      <div className="relative z-10 flex flex-col h-full">
        <header className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-textDark hover:bg-softPink rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-xl font-bold text-textDark ml-2">My Wishlist</h1>
        </header>

        {wishlistedProducts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center pb-24">
            <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-sm border border-borderSoft">
              <HeartIcon className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-heading text-xl font-bold text-textDark mb-2">Your wishlist is empty</h2>
            <p className="text-textMid text-center mb-6">Save your favorite treats here for later.</p>
            <button 
              onClick={() => navigate('/menu')}
              className="bg-primary hover:bg-accent text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pb-10">
            {wishlistedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
