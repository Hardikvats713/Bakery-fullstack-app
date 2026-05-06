import { useState } from 'react';
import { ArrowLeftIcon, Trash2Icon, TagIcon, ChevronRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useCartTotals } from '../store';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, appliedPromo, applyPromo, removePromo } = useCartStore();
  const { subtotal, deliveryFee, discount, total } = useCartTotals();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput.toUpperCase());
    if (!success) {
      setPromoError('Invalid promo code');
      setTimeout(() => setPromoError(''), 3000);
    } else {
      setPromoInput('');
      setPromoError('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="p-6 flex flex-col h-full items-center justify-center pt-24 pb-32">
        <header className="absolute top-0 left-0 w-full p-6 flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-textDark hover:bg-softPink rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-xl font-bold text-textDark ml-2">Your Cart</h1>
        </header>
        
        <div className="w-48 h-48 bg-softPink/50 rounded-full flex items-center justify-center mb-8 relative">
          <span className="text-8xl">🛒</span>
          <div className="absolute top-4 right-4 text-4xl">😢</div>
        </div>
        <h2 className="font-heading text-2xl font-bold text-textDark mb-2">Your cart is empty</h2>
        <p className="text-textMid text-center mb-8">Looks like you haven't added any sweet treats yet.</p>
        <button 
          onClick={() => navigate('/items')}
          className="bg-primary hover:bg-accent text-white font-medium py-4 px-8 rounded-2xl transition-colors shadow-warm w-full max-w-xs"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-textDark hover:bg-softPink rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-xl font-bold text-textDark ml-2">Your Cart</h1>
        </div>
      </header>

      {/* Cart Items */}
      <div className="flex-1 overflow-visible mb-6 space-y-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div 
              key={item.product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              className="bg-white rounded-2xl p-3 border border-borderSoft flex items-center shadow-sm"
            >
              <div className="w-16 h-16 bg-softPink/30 rounded-xl flex items-center justify-center text-3xl shrink-0">
                {item.product.imageUrl ? (
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  item.product.emoji
                )}
              </div>
              
              <div className="ml-3 flex-1 flex flex-col justify-center">
                <h3 className="font-heading font-semibold text-textDark text-sm leading-tight mb-1">{item.product.name}</h3>
                <div className="font-bold text-textDark text-sm mb-2">
                  ₹{item.product.price}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-bgLight rounded-lg border border-borderSoft/50 overflow-hidden">
                    <button 
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-textMid hover:bg-softPink transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-textDark">{item.quantity}</span>
                    <button 
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-textMid hover:bg-softPink transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-textLight hover:text-accent transition-colors"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TagIcon className="h-4 w-4 text-textLight" />
            </div>
            <input
              type="text"
              placeholder="Promo code (try SWEET20)"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="w-full bg-white border border-borderSoft rounded-xl py-3 pl-9 pr-4 text-sm text-textDark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary uppercase placeholder:normal-case"
              disabled={!!appliedPromo}
            />
          </div>
          {appliedPromo ? (
            <button 
              onClick={removePromo}
              className="bg-accent/10 text-accent font-medium px-4 py-3 rounded-xl hover:bg-accent/20 transition-colors"
            >
              Remove
            </button>
          ) : (
            <button 
              onClick={handleApplyPromo}
              className="bg-textDark text-white font-medium px-6 py-3 rounded-xl hover:bg-black transition-colors"
            >
              Apply
            </button>
          )}
        </div>
        {promoError && <p className="text-accent text-xs mt-2 ml-1">{promoError}</p>}
        {appliedPromo && <p className="text-green-600 text-xs mt-2 ml-1 font-medium">✨ Promo code {appliedPromo} applied!</p>}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-3xl p-5 border border-borderSoft shadow-sm mb-6">
        <h3 className="font-heading font-bold text-textDark mb-4">Order Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-textMid">
            <span>Subtotal</span>
            <span className="text-textDark font-medium">₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-textMid">
            <span>Delivery Fee</span>
            <span className="text-textDark font-medium">{deliveryFee === 0 ? <span className="text-green-600">Free</span> : `₹${deliveryFee}`}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}
          <div className="pt-3 border-t border-borderSoft mt-3 flex justify-between font-bold text-textDark text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button 
        onClick={() => navigate('/checkout')}
        className="bg-gradient-to-r from-primary to-accent text-white font-medium py-4 rounded-2xl shadow-warm-lg flex items-center justify-center space-x-2 w-full transition-transform active:scale-95"
      >
        <span>Proceed to Checkout</span>
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
